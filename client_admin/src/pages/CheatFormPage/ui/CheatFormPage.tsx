import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Select, Card, Space, Divider, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getGames, gameKeys } from "@/entities/game";
import { getBrands, brandKeys } from "@/entities/brand";
import {
  getCheatById,
  cheatKeys,
  CreateCheatDto,
  useCreateCheat,
  useEditCheat,
  FunctionCategoryDto,
  PricingPlanDto,
} from "@/entities/cheat";
import { FunctionListsManager, FunctionList } from "@/features/create-cheat/ui/FunctionListsManager";
import { PricingPlansManager, PricingPlan } from "@/features/create-cheat/ui/PricingPlansManager";
import { ScreenshotsUpload } from "@/features/create-cheat/ui/ScreenshotsUpload";
import { CircularImageUpload } from "@/features/create-cheat/ui/CircularImageUpload";
import { CheatImageUpload } from "@/features/create-cheat/ui/CheatImageUpload";
import { VideoUpload } from "@/features/create-cheat/ui/VideoUpload";
import { MarkdownEditor } from "@/features/create-cheat/ui/MarkdownEditor";
import { DEFAULT_MARKDOWN_DESCRIPTION } from "@/features/create-cheat/lib/constants";
import * as Styled from "./styled";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
};

export function CheatFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const isEditMode = !!id;
  const createCheat = useCreateCheat();
  const editCheat = useEditCheat();
  const [functionLists, setFunctionLists] = useState<FunctionList[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [circularImage, setCircularImage] = useState<string | undefined>(undefined);
  const [cheatImage, setCheatImage] = useState<string | undefined>(undefined);
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  const [descriptionMarkdown, setDescriptionMarkdown] = useState<string>(DEFAULT_MARKDOWN_DESCRIPTION);

  const { data: games = [], isLoading: gamesLoading } = useQuery({
    queryKey: gameKeys.lists(),
    queryFn: getGames,
  });

  const { data: brands = [], isLoading: brandsLoading } = useQuery({
    queryKey: brandKeys.lists(),
    queryFn: getBrands,
  });

  const { data: cheat, isLoading: cheatLoading } = useQuery({
    queryKey: cheatKeys.detail(id!),
    queryFn: () => getCheatById(id!),
    enabled: isEditMode,
  });

  useEffect(() => {
    if (cheat && isEditMode) {
      // Convert functions to FunctionList format
      const functions = cheat.functions || [];
      const convertedFunctions: FunctionList[] = functions.map((func: FunctionCategoryDto, index: number) => ({
        id: func.id || `list-${index}`,
        name: func.name || "",
        features: func.features && func.features.length > 0 
          ? func.features.map((f) => `- ${f}`).join("\n")
          : "",
      }));

      // Convert pricingPlans to PricingPlan format
      const plans = cheat.pricingPlans || [];
      const convertedPlans: PricingPlan[] = plans.map((plan: PricingPlanDto, index: number) => ({
        id: plan.id || `plan-${index}`,
        price: plan.price || 0,
        durationDays: plan.durationDays || 1,
        currency: plan.currency || "RUB",
        redirectUrl: plan.redirectUrl || "",
      }));

      // Find brand by name to set brandId
      const selectedBrand = brands.find(brand => brand.name === cheat.brandName);

      form.setFieldsValue({
        gameId: cheat.gameId,
        brandId: selectedBrand?.id || "",
        description: cheat.description || "",
        status: cheat.status || "AVAILABLE",
      });

      setFunctionLists(convertedFunctions);
      setPricingPlans(convertedPlans);
      setScreenshots(cheat.screenshots || []);
      setCircularImage(cheat.circularImage || undefined);
      setCheatImage(cheat.image || undefined);
      setVideoUrl(cheat.videoUrl || undefined);
      setDescriptionMarkdown(cheat.descriptionMarkdown || "");
    } else if (!isEditMode) {
      // Reset form for create mode
      form.resetFields();
      setFunctionLists([]);
      setPricingPlans([]);
      setScreenshots([]);
      setCircularImage(undefined);
      setCheatImage(undefined);
      setVideoUrl(undefined);
      setDescriptionMarkdown(DEFAULT_MARKDOWN_DESCRIPTION);
    }
  }, [cheat, isEditMode, form]);

  const handleSubmit = async (values: any) => {
    try {
      // Validate pricing plans - check if all plans have redirectUrl
      const plansWithoutRedirectUrl = pricingPlans.filter(
        (plan) => plan.price > 0 && plan.durationDays > 0 && (!plan.redirectUrl || plan.redirectUrl.trim() === "")
      );

      if (plansWithoutRedirectUrl.length > 0) {
        message.error(t("cheats.form.redirectUrlRequiredForAllPlans") || "All pricing plans must have a redirect URL");
        return;
      }

      // Convert FunctionList[] to FunctionCategoryDto[]
      const functions: FunctionCategoryDto[] = functionLists
        .filter((list) => list.name.trim().length > 0) // Only include lists with names
        .map((list) => ({
          id: list.id,
          name: list.name,
          features: list.features
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .map((line) => {
              // Remove leading dashes and spaces
              const cleaned = line.replace(/^[-•]\s*/, "").trim();
              return cleaned;
            })
            .filter((line) => line.length > 0), // Remove empty lines after cleaning
        }));

      // Convert PricingPlan[] to PricingPlanDto[]
      const plans: PricingPlanDto[] = pricingPlans
        .filter((plan) => plan.price > 0 && plan.durationDays > 0 && plan.redirectUrl && plan.redirectUrl.trim() !== "") // Only include valid plans with redirectUrl
        .map((plan) => ({
          id: plan.id,
          price: plan.price,
          durationDays: plan.durationDays,
          currency: plan.currency,
          duration: `${plan.durationDays}${t("cheats.form.daysShort")}`,
          image: "",
          isAvailable: true,
          redirectUrl: plan.redirectUrl!,
        }));

      // Find selected brand
      const selectedBrand = brands.find(brand => brand.id === values.brandId);
      if (!selectedBrand) {
        throw new Error("Selected brand not found");
      }

      const dto: CreateCheatDto = {
        gameId: values.gameId,
        name: selectedBrand.name, // Generate name from brand name
        brandId: values.brandId,
        description: values.description || "",
        descriptionMarkdown: descriptionMarkdown || undefined,
        circularText: "",
        image: cheatImage,
        price: {
          amount: plans.length > 0 ? plans[0].price : null,
          currency: plans.length > 0 ? plans[0].currency : "RUB",
        },
        productName: selectedBrand.name, // Generate productName from brand name
        windowsVersion: "",
        gameVersion: "",
        gameMode: "",
        processors: "",
        supportedSystems: [],
        buttonText: "",
        breadcrumbs: [],
        screenshots: screenshots,
        circularImage: circularImage,
        videoUrl: videoUrl,
        functions: functions,
        pricingPlans: plans,
        isNew: false,
        isComingSoon: false,
        status: values.status || "AVAILABLE",
      };

      if (isEditMode && id) {
        await editCheat.mutateAsync({
          id,
          dto: {
            ...dto,
            status: values.status,
          },
        });
      } else {
        await createCheat.mutateAsync(dto);
      }

      navigate("/cheats");
    } catch (error) {
      // Error handling is done in the mutation hook
    }
  };

  if (isEditMode && cheatLoading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Styled.Container>
        <Styled.Header>
          <Space>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/cheats")}>
              {t("common.back")}
            </Button>
            <Styled.Title>
              {isEditMode ? t("cheats.editCheat") : t("cheats.createCheat")}
            </Styled.Title>
          </Space>
        </Styled.Header>

        <motion.div variants={cardVariants} initial="initial" animate="animate">
          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              disabled={createCheat.isPending || editCheat.isPending}
            >
              {/* Section 1: Basic Information */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Styled.SectionTitle>{t("cheats.form.basicInfo")}</Styled.SectionTitle>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                  <Form.Item
                    name="gameId"
                    label={t("cheats.form.game")}
                    rules={[{ required: true, message: t("cheats.form.gameRequired") }]}
                  >
                    <Select
                      placeholder={t("cheats.form.gamePlaceholder")}
                      loading={gamesLoading}
                      showSearch
                      optionFilterProp="children"
                      size="large"
                    >
                      {games.map((game) => (
                        <Select.Option key={game.id} value={game.id}>
                          {game.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="brandId"
                    label={t("cheats.form.brandName")}
                    rules={[{ required: true, message: t("cheats.form.brandNameRequired") }]}
                  >
                    <Select
                      placeholder={t("cheats.form.brandNamePlaceholder")}
                      loading={brandsLoading}
                      showSearch
                      optionFilterProp="children"
                      size="large"
                    >
                      {brands.map((brand) => (
                        <Select.Option key={brand.id} value={brand.id}>
                          {brand.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label={t("cheats.form.description")}
                  >
                    <Input.TextArea
                      placeholder={t("cheats.form.descriptionPlaceholder")}
                      rows={3}
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="status"
                    label={t("cheats.form.status")}
                    rules={[{ required: true, message: t("cheats.form.statusRequired") }]}
                    initialValue="AVAILABLE"
                  >
                    <Select size="large">
                      <Select.Option value="AVAILABLE">{t("cheats.available")}</Select.Option>
                      <Select.Option value="UPDATING">{t("cheats.updating")}</Select.Option>
                      <Select.Option value="FROZEN">{t("cheats.frozen")}</Select.Option>
                    </Select>
                  </Form.Item>
                </Space>
              </motion.div>

              <Divider />

              {/* Section: Markdown Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Styled.SectionTitle>{t("cheats.form.descriptionMarkdown")}</Styled.SectionTitle>
                <Form.Item>
                  <MarkdownEditor
                    value={descriptionMarkdown}
                    onChange={setDescriptionMarkdown}
                    placeholder={t("cheats.form.descriptionMarkdownPlaceholder")}
                  />
                </Form.Item>
              </motion.div>

              <Divider />

              {/* Section: Cheat Image */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
              >
                <Styled.SectionTitle>{t("cheats.form.cheatImage") || "Cheat Image"}</Styled.SectionTitle>
                <Form.Item>
                  <CheatImageUpload value={cheatImage} onChange={setCheatImage} />
                </Form.Item>
              </motion.div>

              <Divider />

              {/* Section 2: Screenshots */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Styled.SectionTitle>{t("cheats.form.screenshots")}</Styled.SectionTitle>
                <Form.Item>
                  <ScreenshotsUpload value={screenshots} onChange={setScreenshots} />
                </Form.Item>
              </motion.div>

              <Divider />

              {/* Section 2.5: Circular Image */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Styled.SectionTitle>{t("cheats.form.circularImage")}</Styled.SectionTitle>
                <Form.Item>
                  <CircularImageUpload value={circularImage} onChange={setCircularImage} />
                </Form.Item>
              </motion.div>

              <Divider />

              {/* Section 2.6: Video Upload */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.27 }}
              >
                <Styled.SectionTitle>{t("cheats.form.video") || "Video (MP4/MPEG)"}</Styled.SectionTitle>
                <Form.Item>
                  <VideoUpload value={videoUrl} onChange={setVideoUrl} />
                </Form.Item>
              </motion.div>

              <Divider />

              {/* Section 3: Function Lists */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Form.Item>
                  <FunctionListsManager value={functionLists} onChange={setFunctionLists} />
                </Form.Item>
              </motion.div>

              <Divider />

              {/* Section 4: Pricing Plans */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Form.Item>
                  <PricingPlansManager value={pricingPlans} onChange={setPricingPlans} />
                </Form.Item>
              </motion.div>

            </Form>
          </Card>
        </motion.div>

        {/* Sticky Footer */}
        <Styled.Footer>
          <Styled.FooterContent>
            <Space>
              <Button
                type="primary"
                onClick={() => form.submit()}
                loading={createCheat.isPending || editCheat.isPending}
                size="large"
              >
                {isEditMode ? t("cheats.updateCheat") : t("cheats.createCheat")}
              </Button>
              <Button onClick={() => navigate("/cheats")} size="large">
                {t("common.cancel")}
              </Button>
            </Space>
          </Styled.FooterContent>
        </Styled.Footer>
      </Styled.Container>
    </motion.div>
  );
}
