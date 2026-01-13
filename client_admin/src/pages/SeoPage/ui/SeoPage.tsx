import { Card, Tabs, TabsProps, message } from "antd";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateSeoPageByType,
  seoPagesKeys,
  SeoPageType,
} from "@/entities/seo-pages";
import { HomeTab, GamesTab, FaqTab } from "./tabs";
import * as Styled from "./styled";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function SeoPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({
      pageType,
      keywords,
    }: {
      pageType: SeoPageType;
      keywords: string[];
    }) => updateSeoPageByType(pageType, { keywords }),
    onSuccess: (_, { pageType }) => {
      queryClient.invalidateQueries({
        queryKey: seoPagesKeys.detail(pageType),
      });
      message.success(t("seo.keywordsUpdated", "Ключевые слова обновлены"));
    },
    onError: () => {
      message.error(
        t("seo.keywordsUpdateFailed", "Ошибка обновления ключевых слов")
      );
    },
  });

  const handleSubmit = async (pageType: SeoPageType, keywords: string[]) => {
    updateMutation.mutate({ pageType, keywords });
  };

  const tabsItems: TabsProps["items"] = [
    {
      key: "home",
      label: t("seo.homeTab", "Главная"),
      children: (
        <HomeTab
          onSubmit={(keywords) => handleSubmit("home", keywords)}
          isUpdating={updateMutation.isPending}
        />
      ),
    },
    {
      key: "games",
      label: t("seo.gamesTab", "Страница с играми"),
      children: (
        <GamesTab
          onSubmit={(keywords) => handleSubmit("games", keywords)}
          isUpdating={updateMutation.isPending}
        />
      ),
    },
    {
      key: "faq",
      label: t("seo.faqTab", "Страница FAQ"),
      children: (
        <FaqTab
          onSubmit={(keywords) => handleSubmit("faq", keywords)}
          isUpdating={updateMutation.isPending}
        />
      ),
    },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <Styled.Container>
        <Styled.SeoCard>
          <Card title={t("seo.title", "SEO настройки")}>
            <Tabs defaultActiveKey="home" items={tabsItems} />
          </Card>
        </Styled.SeoCard>
      </Styled.Container>
    </motion.div>
  );
}
