import React from "react";
import { Card, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { FooterLinksForm } from "@/features/footer-links-form";
import { FooterLink } from "@/entities/settings";

interface FooterLinksTabProps {
  footerLinksValue: FooterLink[];
  onFooterLinksChange: (links: FooterLink[]) => void;
  onSubmit: (values: { footerLinks?: FooterLink[] }) => void;
  isUpdating: boolean;
  footerLinksFormRef: React.RefObject<{ getValue: () => FooterLink[] } | null>;
}

export function FooterLinksTab({
  footerLinksValue,
  onFooterLinksChange,
  onSubmit,
  isUpdating,
  footerLinksFormRef
}: FooterLinksTabProps) {
  const { t } = useTranslation();

  const handleSave = async () => {
    const currentLinks = footerLinksFormRef.current?.getValue() || footerLinksValue;
    // Filter out empty or invalid links
    const validLinks = currentLinks.filter(
      (link) => link?.label && link?.href
    );
    onSubmit({ footerLinks: validLinks });
  };

  return (
    <Card title={t("settings.footerLinksSettings", "Настройки ссылок футера")}>
      <FooterLinksForm
        ref={footerLinksFormRef}
        value={footerLinksValue}
        onChange={onFooterLinksChange}
      />
      <div style={{ marginTop: 16 }}>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          loading={isUpdating}
          size="large"
          onClick={handleSave}
        >
          {t("settings.saveSettings")}
        </Button>
      </div>
    </Card>
  );
}
