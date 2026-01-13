"use client";

import React from "react";
import { Form, Input, Space, Card } from "antd";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FooterLabel } from "@/entities/settings/api/settingsApi";

interface FooterLabelsFormProps {
  value?: FooterLabel[];
  onChange?: (labels: FooterLabel[]) => void;
}

export const FooterLabelsForm = React.forwardRef<
  { getValue: () => FooterLabel[] },
  FooterLabelsFormProps
>(({ value = [], onChange }, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const prevValueRef = React.useRef<FooterLabel[]>(value);
  const isInternalChangeRef = React.useRef(false);

  // Expose method to get current form value
  React.useImperativeHandle(ref, () => ({
    getValue: () => {
      const formValues = form.getFieldsValue();
      return [
        {
          label: formValues.copyrightText || "",
          href: undefined,
        },
        {
          label: formValues.emailAddress || "",
          href: formValues.emailAddress ? `mailto:${formValues.emailAddress}` : undefined,
        },
      ].filter(label => label.label); // Only return labels with content
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
      const copyrightLabel = value.find(label => !label.href);
      const emailLabel = value.find(label => label.href?.startsWith("mailto:"));

      form.setFieldsValue({
        copyrightText: copyrightLabel?.label || "",
        emailAddress: emailLabel?.href?.replace("mailto:", "") || "",
      });
      prevValueRef.current = value;
    }
  }, [value, form]);

  // Watch for form changes and notify parent
  const watchedCopyrightText = Form.useWatch("copyrightText", form) || "";
  const watchedEmailAddress = Form.useWatch("emailAddress", form) || "";

  React.useEffect(() => {
    const labels: FooterLabel[] = [
      {
        label: watchedCopyrightText,
        href: undefined,
      },
      {
        label: watchedEmailAddress,
        href: watchedEmailAddress ? `mailto:${watchedEmailAddress}` : undefined,
      },
    ].filter(label => label.label); // Only include labels with content

    const prevStr = JSON.stringify(prevValueRef.current);
    const currentStr = JSON.stringify(labels);
    if (prevStr !== currentStr) {
      prevValueRef.current = labels;
      isInternalChangeRef.current = true;
      onChange?.(labels);
    }
  }, [watchedCopyrightText, watchedEmailAddress, onChange]);

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
        copyrightText: value.find(label => !label.href)?.label || "",
        emailAddress: value.find(label => label.href?.startsWith("mailto:"))?.href?.replace("mailto:", "") || "",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Copyright Text */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Card size="small" title={t("settings.copyrightText", "Текст копирайта")}>
            <Form.Item
              name="copyrightText"
              label={t("settings.copyrightTextLabel", "Текст")}
              rules={[
                {
                  required: true,
                  message: t("settings.copyrightTextRequired", "Текст копирайта обязателен"),
                },
              ]}
            >
              <Input
                placeholder={t("settings.copyrightTextPlaceholder", "© Official email address of our site")}
              />
            </Form.Item>
          </Card>
        </motion.div>

        {/* Email Address */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Card size="small" title={t("settings.emailAddress", "Email адрес")}>
            <Form.Item
              name="emailAddress"
              label={t("settings.emailAddressLabel", "Email")}
              rules={[
                {
                  type: "email",
                  message: t("settings.emailAddressInvalid", "Введите корректный email адрес"),
                },
              ]}
            >
              <Input
                placeholder={t("settings.emailAddressPlaceholder", "example@email.com")}
              />
            </Form.Item>
          </Card>
        </motion.div>
      </Space>
    </Form>
  );
});
