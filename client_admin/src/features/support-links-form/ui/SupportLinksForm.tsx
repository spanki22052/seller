"use client";

import React from "react";
import { Form, Input, Space, Card } from "antd";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SupportLink } from "@/entities/settings/api/settingsApi";

interface SupportLinksFormProps {
  value?: SupportLink[];
  onChange?: (links: SupportLink[]) => void;
}

export const SupportLinksForm = React.forwardRef<
  { getValue: () => SupportLink[] },
  SupportLinksFormProps
>(({ value = [], onChange }, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const prevValueRef = React.useRef<SupportLink[]>(value);
  const isInternalChangeRef = React.useRef(false);

  // Expose method to get current form value
  React.useImperativeHandle(ref, () => ({
    getValue: () => {
      const formValues = form.getFieldsValue();
      return [
        {
          label: t("settings.techSupport", "Техническая поддержка"),
          href: formValues.techSupportHref || "",
        },
        {
          label: t("settings.contactAdmin", "Связь с администратором"),
          href: formValues.contactAdminHref || "",
        },
      ].filter(link => link.href); // Only return links with href
    },
  }));

  // Sync form with external value
  React.useEffect(() => {
    if (isInternalChangeRef.current) {
      isInternalChangeRef.current = false;
      return;
    }

    const prevStr = JSON.stringify(prevValueRef.current);
    const currentStr = JSON.stringify(value);
    if (prevStr !== currentStr) {
      const techSupport = value.find(link => link.label === t("settings.techSupport", "Техническая поддержка"));
      const contactAdmin = value.find(link => link.label === t("settings.contactAdmin", "Связь с администратором"));

      form.setFieldsValue({
        techSupportHref: techSupport?.href || "",
        contactAdminHref: contactAdmin?.href || "",
      });
      prevValueRef.current = value;
    }
  }, [value, form, t]);

  // Watch for form changes and notify parent
  const watchedTechSupportHref = Form.useWatch("techSupportHref", form) || "";
  const watchedContactAdminHref = Form.useWatch("contactAdminHref", form) || "";

  React.useEffect(() => {
    const links: SupportLink[] = [
      {
        label: t("settings.techSupport", "Техническая поддержка"),
        href: watchedTechSupportHref,
      },
      {
        label: t("settings.contactAdmin", "Связь с администратором"),
        href: watchedContactAdminHref,
      },
    ].filter(link => link.href); // Only include links with href

    const prevStr = JSON.stringify(prevValueRef.current);
    const currentStr = JSON.stringify(links);
    if (prevStr !== currentStr) {
      prevValueRef.current = links;
      isInternalChangeRef.current = true;
      onChange?.(links);
    }
  }, [watchedTechSupportHref, watchedContactAdminHref, onChange, t]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        techSupportHref: value.find(link => link.label === t("settings.techSupport", "Техническая поддержка"))?.href || "",
        contactAdminHref: value.find(link => link.label === t("settings.contactAdmin", "Связь с администратором"))?.href || "",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Техническая поддержка */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Card size="small" title={t("settings.techSupport", "Техническая поддержка")}>
            <Form.Item
              name="techSupportHref"
              label={t("settings.supportLinkHref", "Ссылка")}
              rules={[
                {
                  type: "url",
                  message: t("settings.supportLinkHrefInvalid", "Введите корректную ссылку"),
                },
              ]}
            >
              <Input
                placeholder={t("settings.supportLinkHrefPlaceholder", "https://discord.gg/support")}
              />
            </Form.Item>
          </Card>
        </motion.div>

        {/* Связь с администратором */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Card size="small" title={t("settings.contactAdmin", "Связь с администратором")}>
            <Form.Item
              name="contactAdminHref"
              label={t("settings.supportLinkHref", "Ссылка")}
              rules={[
                {
                  type: "url",
                  message: t("settings.supportLinkHrefInvalid", "Введите корректную ссылку"),
                },
              ]}
            >
              <Input
                placeholder={t("settings.supportLinkHrefPlaceholder", "https://telegram.me/admin")}
              />
            </Form.Item>
          </Card>
        </motion.div>
      </Space>
    </Form>
  );
});
