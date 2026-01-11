import React from "react";
import { Card, Button, Input, message, Spin } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getSeoPageByType, seoPagesKeys } from "@/entities/seo-pages";

interface GamesTabProps {
  onSubmit: (keywords: string[]) => void;
  isUpdating: boolean;
}

export function GamesTab({ onSubmit, isUpdating }: GamesTabProps) {
  const { t } = useTranslation();
  const [keywordsText, setKeywordsText] = React.useState("");

  const { data: seoPage, isLoading } = useQuery({
    queryKey: seoPagesKeys.detail("games"),
    queryFn: () => getSeoPageByType("games"),
  });

  React.useEffect(() => {
    if (seoPage?.keywords) {
      setKeywordsText(seoPage.keywords.join("\n"));
    }
  }, [seoPage]);

  const handleSubmit = () => {
    const keywords = keywordsText
      .split("\n")
      .map(k => k.trim())
      .filter(k => k.length > 0);

    if (keywords.length === 0) {
      message.warning(t("seo.keywordsRequired", "Введите хотя бы одно ключевое слово"));
      return;
    }

    onSubmit(keywords);
  };

  if (isLoading) {
    return (
      <Card title={t("seo.gamesTab", "Страница с играми")}>
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin size="large" />
        </div>
      </Card>
    );
  }

  return (
    <Card title={t("seo.gamesTab", "Страница с играми")}>
      <div style={{ marginBottom: 16 }}>
        <p>{t("seo.keywordsDescription", "Введите ключевые слова для страницы с играми, каждое с новой строки:")}</p>
      </div>

      <Input.TextArea
        value={keywordsText}
        onChange={(e) => setKeywordsText(e.target.value)}
        placeholder={t("seo.keywordsPlaceholder", "читы для игр\nкупить читы онлайн\nлучшие игровые читы")}
        rows={10}
        style={{ marginBottom: 16 }}
      />

      <Button
        type="primary"
        icon={<SaveOutlined />}
        onClick={handleSubmit}
        loading={isUpdating}
        size="large"
      >
        {t("seo.saveKeywords", "Сохранить ключевые слова")}
      </Button>
    </Card>
  );
}
