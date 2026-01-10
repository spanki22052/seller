import React from "react";
import { Card, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { SupportLinksForm } from "@/features/support-links-form";
import { SupportLink } from "@/entities/settings";

interface SupportLinksTabProps {
  supportLinksValue: SupportLink[];
  onSupportLinksChange: (links: SupportLink[]) => void;
  onSubmit: (values: { supportLinks?: SupportLink[] }) => void;
  isUpdating: boolean;
  supportLinksFormRef: React.RefObject<{
    getValue: () => SupportLink[];
  } | null>;
}

export function SupportLinksTab({
  supportLinksValue,
  onSupportLinksChange,
  onSubmit,
  isUpdating,
  supportLinksFormRef,
}: SupportLinksTabProps) {
  const { t } = useTranslation();

  const handleSave = async () => {
    const currentLinks =
      supportLinksFormRef.current?.getValue() || supportLinksValue;
    // Filter out empty or invalid links
    const validLinks = currentLinks.filter((link) => link?.label && link?.href);
    onSubmit({ supportLinks: validLinks });
  };

  return (
    <Card
      title={t(
        "Настройки ссылок в блоке на главной странице при клике на кнопки"
      )}
    >
      <SupportLinksForm
        ref={supportLinksFormRef}
        value={supportLinksValue}
        onChange={onSupportLinksChange}
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
