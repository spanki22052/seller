import React from "react";
import { Card, Form, Spin, Tabs, TabsProps } from "antd";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings, settingsKeys } from "@/entities/settings";
import {
  FooterLink,
  FooterLabel,
  SupportLink,
} from "@/entities/settings/api/settingsApi";
import {
  TutorialTab,
  GameIconsTab,
  GameCarouselTab,
  FooterLinksTab,
  FooterLabelsTab,
  SupportLinkTab,
  SupportLinksTab,
  AdminSettingsTab,
  IconTab,
  MainPageTab,
  SiteNameTab,
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
  const [footerLabelsValue, setFooterLabelsValue] = React.useState<
    FooterLabel[]
  >([]);
  const footerLabelsFormRef = React.useRef<{
    getValue: () => FooterLabel[];
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
  const [siteNameForm] = Form.useForm();
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

  // Update footerLabelsValue when settings are loaded
  React.useEffect(() => {
    if (settings?.footerLabels) {
      setFooterLabelsValue(settings.footerLabels);
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
    if (settings?.sellerId || settings?.siteName) {
      adminSettingsForm.setFieldsValue({
        sellerId: settings.sellerId,
        siteName: settings.siteName,
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

  // Update siteNameForm when settings are loaded
  React.useEffect(() => {
    if (settings?.siteName) {
      siteNameForm.setFieldsValue({
        siteName: settings.siteName,
      });
    }
  }, [settings, siteNameForm]);

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

  // Determine if we should use vertical tabs on very small screens
  const [isMobileVertical, setIsMobileVertical] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileVertical(window.innerWidth < 480);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
      label: isMobileVertical ? "Обучение" : t("settings.tutorialTab"),
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
      label: isMobileVertical
        ? "Главная"
        : t("settings.mainPageTab", "Главная страница"),
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
      key: "siteName",
      label: isMobileVertical
        ? "Название"
        : t("settings.siteNameTab", "Название сайта"),
      children: (
        <SiteNameTab
          form={siteNameForm}
          settings={settings}
          onSubmit={handleSubmit}
          isUpdating={updateMutation.isPending}
        />
      ),
    },
    {
      key: "icon",
      label: isMobileVertical ? "Иконка" : t("settings.iconTab", "Иконка"),
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
      label: isMobileVertical ? "Иконки игр" : t("settings.gameIconsTab"),
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
      label: isMobileVertical ? "Карусель" : t("settings.gameCarouselTab"),
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
      label: isMobileVertical
        ? "Ссылки"
        : t("settings.footerLinksTab", "Ссылки футера"),
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
      key: "footerLabels",
      label: isMobileVertical
        ? "Текст"
        : t("settings.footerLabelsTab", "Текст футера"),
      children: (
        <FooterLabelsTab
          footerLabelsValue={footerLabelsValue}
          onFooterLabelsChange={setFooterLabelsValue}
          onSubmit={handleSubmit}
          isUpdating={updateMutation.isPending}
          footerLabelsFormRef={footerLabelsFormRef}
        />
      ),
    },
    {
      key: "supportSettings",
      label: isMobileVertical ? "Поддержка" : "Настройки ссылки поддержки",
      children: (
        <div>
          <div style={{ marginBottom: isMobileVertical ? 16 : 24 }}>
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
      label: isMobileVertical
        ? "Админ"
        : t("settings.adminSettingsTab", "Настройки админа"),
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
          <Card
            title={`${settings?.siteName ? `${settings.siteName} - ` : ""}${
              t("settings.title") || "Настройки"
            }`}
          >
            <Tabs
              defaultActiveKey="tutorial"
              items={tabsItems}
              tabPosition={isMobileVertical ? "top" : "top"}
              size={isMobileVertical ? "small" : "middle"}
              type="card"
              className="responsive-tabs"
            />
          </Card>
        </Styled.SettingsCard>
      </Styled.Container>
    </motion.div>
  );
}
