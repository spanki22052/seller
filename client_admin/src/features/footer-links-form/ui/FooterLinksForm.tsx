"use client";

import React from "react";
import { Form, Input, Button, Space, Card, message } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FooterLink } from "@/entities/settings/api/settingsApi";


interface FooterLinksFormProps {
  value?: FooterLink[];
  onChange?: (links: FooterLink[]) => void;
}

export const FooterLinksForm = React.forwardRef<
  { getValue: () => FooterLink[] },
  FooterLinksFormProps
>(({ value = [], onChange }, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const prevValueRef = React.useRef<FooterLink[]>(value);
  const isInternalChangeRef = React.useRef(false);
  const skipNextWatchRef = React.useRef(false);

  // Watch form changes and sync with parent
  const watchedLinks = Form.useWatch("footerLinks", form) || [];

  // Expose method to get current form value
  React.useImperativeHandle(ref, () => ({
    getValue: () => {
      const formValues = form.getFieldsValue();
      return formValues.footerLinks || [];
    },
  }));

  // Sync form with external value only when it changes externally
  React.useEffect(() => {
    // Skip update if change was internal
    if (isInternalChangeRef.current) {
      isInternalChangeRef.current = false;
      return;
    }
    
    // Only update if value changed externally
    const prevStr = JSON.stringify(prevValueRef.current);
    const currentStr = JSON.stringify(value);
    if (prevStr !== currentStr) {
      skipNextWatchRef.current = true; // Skip watch effect when updating from external source
      form.setFieldsValue({ footerLinks: value });
      prevValueRef.current = value;
    }
  }, [value, form]);

  // Watch for form changes and notify parent
  React.useEffect(() => {
    if (skipNextWatchRef.current) {
      skipNextWatchRef.current = false;
      return;
    }

    const prevStr = JSON.stringify(prevValueRef.current);
    const currentStr = JSON.stringify(watchedLinks);
    if (prevStr !== currentStr) {
      prevValueRef.current = watchedLinks;
      isInternalChangeRef.current = true;
      onChange?.(watchedLinks);
    }
  }, [watchedLinks, onChange]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ footerLinks: value }}
    >
      <Form.List name="footerLinks">
        {(fields, { add, remove }) => (
          <>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <AnimatePresence mode="popLayout">
                {fields.map(({ key, name, ...restField }) => (
                  <motion.div
                    key={key}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <Card
                      size="small"
                      extra={
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          size="small"
                          onClick={() => {
                            remove(name);
                            // onChange will be called automatically via Form.useWatch
                            message.success(t("settings.footerLinkRemoved", "Ссылка удалена"));
                          }}
                        />
                      }
                    >
                      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                        <Form.Item
                          {...restField}
                          name={[name, "label"]}
                          label={t("settings.footerLinkLabel", "Название ссылки")}
                          rules={[
                            {
                              required: true,
                              message: t("settings.footerLinkLabelRequired", "Название ссылки обязательно"),
                            },
                          ]}
                        >
                          <Input
                            placeholder={t("settings.footerLinkLabelPlaceholder", "Например: Discord")}
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "href"]}
                          label={t("settings.footerLinkHref", "Ссылка")}
                          rules={[
                            {
                              required: true,
                              message: t("settings.footerLinkHrefRequired", "Ссылка обязательна"),
                            },
                            {
                              type: "url",
                              message: t("settings.footerLinkHrefInvalid", "Введите корректную ссылку"),
                            },
                          ]}
                        >
                          <Input
                            placeholder={t("settings.footerLinkHrefPlaceholder", "https://example.com")}
                          />
                        </Form.Item>
                      </Space>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Space>

            <Form.Item style={{ marginTop: 16 }}>
              <Button
                type="dashed"
                onClick={() => {
                  add({ label: "", href: "" });
                  // onChange will be called automatically via Form.useWatch
                  message.info(t("settings.footerLinkAdded", "Добавлена новая ссылка"));
                }}
                icon={<PlusOutlined />}
                block
              >
                {t("settings.addFooterLink", "Добавить ссылку")}
              </Button>
            </Form.Item>

            {fields.length === 0 && (
              <Card style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ color: "#8c8c8c" }}>
                  <PlusOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                  <div style={{ fontSize: 16, marginBottom: 8 }}>
                    {t("settings.noFooterLinks", "Ссылок пока нет")}
                  </div>
                  <div style={{ fontSize: 14 }}>
                    {t("settings.addFirstFooterLink", "Добавьте первую ссылку для футера")}
                  </div>
                </div>
              </Card>
            )}
          </>
        )}
      </Form.List>
    </Form>
  );
});
