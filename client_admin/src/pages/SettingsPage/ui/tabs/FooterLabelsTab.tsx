import React from "react";
import { Card, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { FooterLabelsForm } from "@/features/footer-labels-form";
import { FooterLabel } from "@/entities/settings/api/settingsApi";

interface FooterLabelsTabProps {
  footerLabelsValue: FooterLabel[];
  onFooterLabelsChange: (labels: FooterLabel[]) => void;
  onSubmit: (values: { footerLabels?: FooterLabel[] }) => void;
  isUpdating: boolean;
  footerLabelsFormRef: React.RefObject<{ getValue: () => FooterLabel[] } | null>;
}

export function FooterLabelsTab({
  footerLabelsValue,
  onFooterLabelsChange,
  onSubmit,
  isUpdating,
  footerLabelsFormRef
}: FooterLabelsTabProps) {
  const { t } = useTranslation();

  const handleSave = async () => {
    const currentLabels = footerLabelsFormRef.current?.getValue() || footerLabelsValue;
    // Filter out empty or invalid labels
    const validLabels = currentLabels.filter(
      (label) => label?.label
    );
    onSubmit({ footerLabels: validLabels });
  };

  return (
    <Card title={t("settings.footerLabelsSettings", "Настройки текста футера")}>
      <FooterLabelsForm
        ref={footerLabelsFormRef}
        value={footerLabelsValue}
        onChange={onFooterLabelsChange}
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
