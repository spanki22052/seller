import React from "react";
import { Card, Form, Spin, Tabs, TabsProps } from "antd";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSettings,
  updateSettings,
  settingsKeys,
  FooterLink,
  SupportLink,
} from "@/entities/settings";
import {
  TutorialTab,
  GameIconsTab,
  GameCarouselTab,
  FooterLinksTab,
  SupportLinkTab,
  SupportLinksTab,
  AdminSettingsTab,
  IconTab,
  MainPageTab,
} from "./tabs";
import * as Styled from "./styled";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function SettingsPage() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [gameIconsForm] = Form.useForm();
  const [gameCarouselForm] = Form.useForm();
  const [iconForm] = Form.useForm();
  const [footerLinksValue, setFooterLinksValue] = React.useState<FooterLink[]>(
    []
  );
  const footerLinksFormRef = React.useRef<{
    getValue: () => FooterLink[];
  } | null>(null);
  const [supportLinksValue, setSupportLinksValue] = React.useState<
    SupportLink[]
  >([]);
  const supportLinksFormRef = React.useRef<{
    getValue: () => SupportLink[];
  } | null>(null);
  const [supportLinkForm] = Form.useForm();
  const [adminSettingsForm] = Form.useForm();
  const [mainPageForm] = Form.useForm();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: settingsKeys.detail(),
    queryFn: getSettings,
  });

  // Update gameIconsForm when settings are loaded
  React.useEffect(() => {
    if (settings?.gameIdsForIcons) {
      gameIconsForm.setFieldsValue({
        gameIdsForIcons: settings.gameIdsForIcons,
      });
    }
  }, [settings, gameIconsForm]);

  // Update gameCarouselForm when settings are loaded
  React.useEffect(() => {
    if (settings?.gameIdsForCarousel) {
      gameCarouselForm.setFieldsValue({
        gameIdsForCarousel: settings.gameIdsForCarousel,
      });
    }
  }, [settings, gameCarouselForm]);

  // Update footerLinksValue when settings are loaded
  React.useEffect(() => {
    if (settings?.footerLinks) {
      setFooterLinksValue(settings.footerLinks);
    }
  }, [settings]);

  // Update supportLinksValue when settings are loaded
  React.useEffect(() => {
    if (settings?.supportLinks) {
      setSupportLinksValue(settings.supportLinks);
    }
  }, [settings]);

  // Update supportLinkForm when settings are loaded
  React.useEffect(() => {
    if (settings?.supportLink) {
      supportLinkForm.setFieldsValue({
        supportLink: settings.supportLink,
      });
    }
  }, [settings, supportLinkForm]);

  // Update adminSettingsForm when settings are loaded
  React.useEffect(() => {
    if (settings?.sellerId) {
      adminSettingsForm.setFieldsValue({
        sellerId: settings.sellerId,
      });
    }
  }, [settings, adminSettingsForm]);

  // Update iconForm when settings are loaded
  React.useEffect(() => {
    if (settings?.iconUrl) {
      iconForm.setFieldsValue({
        iconUrl: settings.iconUrl,
      });
    }
  }, [settings, iconForm]);

  // Update mainPageForm when settings are loaded
  React.useEffect(() => {
    if (settings?.mainPageTitle || settings?.mainPageDescription) {
      mainPageForm.setFieldsValue({
        mainPageTitle: settings.mainPageTitle,
        mainPageDescription: settings.mainPageDescription,
      });
    }
  }, [settings, mainPageForm]);

  const updateMutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.detail() });
      // Success message will be shown in individual tab components
    },
    onError: () => {
      // Error message will be shown in individual tab components
    },
  });

  const handleSubmit = async (values: Record<string, unknown>) => {
    updateMutation.mutate(values);
  };

  if (isLoading) {
    return (
      <Styled.Container>
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin size="large" />
          <div style={{ marginTop: 16, color: "#8c8c8c" }}>
            {t("settings.loading")}
          </div>
        </div>
      </Styled.Container>
    );
  }

  const tabsItems: TabsProps["items"] = [
    {
      key: "tutorial",
      label: t("settings.tutorialTab"),
      children: (
        <TutorialTab
          form={form}
          settings={settings}
          onSubmit={handleSubmit}
          isUpdating={updateMutation.isPending}
        />
      ),
    },
    {
      key: "mainPage",
      label: t("settings.mainPageTab", "Главная страница"),
      children: (
        <MainPageTab
          form={mainPageForm}
          settings={settings}
          onSubmit={handleSubmit}
          isUpdating={updateMutation.isPending}
        />
      ),
    },
    {
      key: "icon",
      label: t("settings.iconTab", "Иконка"),
      children: (
        <IconTab
          form={iconForm}
          settings={settings}
          onSubmit={handleSubmit}
          isUpdating={updateMutation.isPending}
        />
      ),
    },
    {
      key: "gameIcons",
      label: t("settings.gameIconsTab"),
      children: (
        <GameIconsTab
          form={gameIconsForm}
          settings={settings}
          onSubmit={handleSubmit}
          isUpdating={updateMutation.isPending}
        />
      ),
    },
    {
      key: "gameCarousel",
      label: t("settings.gameCarouselTab"),
      children: (
        <GameCarouselTab
          form={gameCarouselForm}
          settings={settings}
          onSubmit={handleSubmit}
          isUpdating={updateMutation.isPending}
        />
      ),
    },
    {
      key: "footerLinks",
      label: t("settings.footerLinksTab", "Ссылки футера"),
      children: (
        <FooterLinksTab
          footerLinksValue={footerLinksValue}
          onFooterLinksChange={setFooterLinksValue}
          onSubmit={handleSubmit}
          isUpdating={updateMutation.isPending}
          footerLinksFormRef={footerLinksFormRef}
        />
      ),
    },
    {
      key: "supportSettings",
      label: "Настройки ссылки поддержки",
      children: (
        <div>
          <div style={{ marginBottom: 24 }}>
            <SupportLinkTab
              form={supportLinkForm}
              settings={settings}
              onSubmit={handleSubmit}
              isUpdating={updateMutation.isPending}
            />
          </div>
          <div>
            <SupportLinksTab
              supportLinksValue={supportLinksValue}
              onSupportLinksChange={setSupportLinksValue}
              onSubmit={handleSubmit}
              isUpdating={updateMutation.isPending}
              supportLinksFormRef={supportLinksFormRef}
            />
          </div>
        </div>
      ),
    },
    {
      key: "adminSettings",
      label: t("settings.adminSettingsTab", "Настройки админа"),
      children: (
        <AdminSettingsTab
          form={adminSettingsForm}
          settings={settings}
          onSubmit={handleSubmit}
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
        <Styled.SettingsCard>
          <Card title={t("settings.title") || "Настройки"}>
            <Tabs defaultActiveKey="tutorial" items={tabsItems} />
          </Card>
        </Styled.SettingsCard>
      </Styled.Container>
    </motion.div>
  );
}
