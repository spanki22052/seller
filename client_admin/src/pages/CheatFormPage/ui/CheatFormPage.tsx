import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  Card,
  Space,
  Divider,
  message,
  Switch,
} from "antd";
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
  ReviewDigitalSellerDto,
} from "@/entities/cheat";
import {
  FunctionListsManager,
  FunctionList,
} from "@/features/create-cheat/ui/FunctionListsManager";
import {
  PricingPlansManager,
  PricingPlan,
} from "@/features/create-cheat/ui/PricingPlansManager";
import { ScreenshotsUpload } from "@/features/create-cheat/ui/ScreenshotsUpload";
import { CircularImageUpload } from "@/features/create-cheat/ui/CircularImageUpload";
import { CheatImageUpload } from "@/features/create-cheat/ui/CheatImageUpload";
import { VideoUpload } from "@/features/create-cheat/ui/VideoUpload";
import { MarkdownEditor } from "@/features/create-cheat/ui/MarkdownEditor";
import { ReviewDigitalSellerManager } from "@/features/create-cheat/ui/ReviewDigitalSellerManager";
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
  const [reviewDigitalSeller, setReviewDigitalSeller] = useState<ReviewDigitalSellerDto[]>([]);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [circularImage, setCircularImage] = useState<string | undefined>(
    undefined
  );
  const [cheatImage, setCheatImage] = useState<string | undefined>(undefined);
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  const [descriptionMarkdown, setDescriptionMarkdown] = useState<string>(
    DEFAULT_MARKDOWN_DESCRIPTION
  );
  const [seoText, setSeoText] = useState<string>("");

  // Состояния режима загрузки
  const [screenshotsMode, setScreenshotsMode] = useState<'file' | 'url'>('file');
  const [circularImageMode, setCircularImageMode] = useState<'file' | 'url'>('file');
  const [cheatImageMode, setCheatImageMode] = useState<'file' | 'url'>('file');
  const [videoMode, setVideoMode] = useState<'file' | 'url'>('file');

  // Состояния URL для режима URL
  const [screenshotsUrls, setScreenshotsUrls] = useState<string[]>([]);
  const [circularImageUrl, setCircularImageUrl] = useState<string>('');
  const [cheatImageUrl, setCheatImageUrl] = useState<string>('');
  const [videoUrlInput, setVideoUrlInput] = useState<string>('');

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
      // Конвертировать функции в формат FunctionList
      const functions = cheat.functions || [];
      const convertedFunctions: FunctionList[] = functions.map(
        (func: FunctionCategoryDto, index: number) => ({
          id: func.id || `list-${index}`,
          name: func.name || "",
          features:
            func.features && func.features.length > 0
              ? func.features.map((f) => `- ${f}`).join("\n")
              : "",
        })
      );

      // Конвертировать pricingPlans в формат PricingPlan
      const plans = cheat.pricingPlans || [];
      const convertedPlans: PricingPlan[] = plans.map(
        (plan: PricingPlanDto, index: number) => ({
          id: plan.id || `plan-${index}`,
          price: plan.price || 0,
          durationDays: plan.durationDays || 1,
          currency: plan.currency || "RUB",
          redirectUrl: plan.redirectUrl || "",
          description: plan.description || "",
        })
      );

      // Найти бренд по имени для установки brandId
      const selectedBrand = brands.find(
        (brand) => brand.name === cheat.brandName
      );

      form.setFieldsValue({
        gameId: cheat.gameId,
        brandId: selectedBrand?.id || "",
        description: cheat.description || "",
        status: cheat.status || "AVAILABLE",
      });

      setFunctionLists(convertedFunctions);
      setPricingPlans(convertedPlans);
      setReviewDigitalSeller(cheat.reviewDigitalSeller || []);

      // Инициализировать скриншоты
      const screenshots = cheat.screenshots || [];
      setScreenshots(screenshots);
      if (screenshots.length > 0 && screenshots[0]?.startsWith('http')) {
        setScreenshotsMode('url');
        setScreenshotsUrls(screenshots);
      }

      // Инициализировать круглое изображение
      const circularImg = cheat.circularImage || undefined;
      setCircularImage(circularImg);
      if (circularImg && circularImg.startsWith('http')) {
        setCircularImageMode('url');
        setCircularImageUrl(circularImg);
      }

      // Инициализировать изображение чита
      const cheatImg = cheat.image || undefined;
      setCheatImage(cheatImg);
      if (cheatImg && cheatImg.startsWith('http')) {
        setCheatImageMode('url');
        setCheatImageUrl(cheatImg);
      }

      // Инициализировать видео
      const video = cheat.videoUrl || undefined;
      setVideoUrl(video);
      if (video && video.startsWith('http')) {
        setVideoMode('url');
        setVideoUrlInput(video);
      }

      setDescriptionMarkdown(cheat.descriptionMarkdown || "");
      setSeoText(cheat.seoText || "");
    } else if (!isEditMode) {
      // Сбросить форму для режима создания
      form.resetFields();
      setFunctionLists([]);
      setPricingPlans([]);
      setReviewDigitalSeller([]);
      setScreenshots([]);
      setCircularImage(undefined);
      setCheatImage(undefined);
      setVideoUrl(undefined);
      setDescriptionMarkdown(DEFAULT_MARKDOWN_DESCRIPTION);
      setSeoText("");

      // Сбросить режимы загрузки
      setScreenshotsMode('file');
      setCircularImageMode('file');
      setCheatImageMode('file');
      setVideoMode('file');

      // Сбросить состояния URL
      setScreenshotsUrls([]);
      setCircularImageUrl('');
      setCheatImageUrl('');
      setVideoUrlInput('');
    }
  }, [cheat, isEditMode, form]);

  const handleSubmit = async (values: any) => {
    try {
      // Валидация тарифных планов - проверка наличия redirectUrl у всех планов
      const plansWithoutRedirectUrl = pricingPlans.filter(
        (plan) =>
          plan.price > 0 &&
          plan.durationDays > 0 &&
          (!plan.redirectUrl || plan.redirectUrl.trim() === "")
      );

      if (plansWithoutRedirectUrl.length > 0) {
        message.error(
          t("cheats.form.redirectUrlRequiredForAllPlans") ||
            "Все тарифные планы должны иметь URL перенаправления"
        );
        return;
      }

      // Конвертировать FunctionList[] в FunctionCategoryDto[]
      const functions: FunctionCategoryDto[] = functionLists
        .filter((list) => list.name.trim().length > 0) // Включать только списки с именами
        .map((list) => ({
          id: list.id,
          name: list.name,
          features: list.features
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .map((line) => {
              // Удалить ведущие дефисы и пробелы
              const cleaned = line.replace(/^[-•]\s*/, "").trim();
              return cleaned;
            })
            .filter((line) => line.length > 0), // Удалить пустые строки после очистки
        }));

      // Конвертировать PricingPlan[] в PricingPlanDto[]
      const plans: PricingPlanDto[] = pricingPlans
        .filter(
          (plan) =>
            plan.price > 0 &&
            plan.durationDays > 0 &&
            plan.redirectUrl &&
            plan.redirectUrl.trim() !== ""
        ) // Включать только валидные планы с redirectUrl
        .map((plan) => ({
          id: plan.id,
          price: plan.price,
          durationDays: plan.durationDays,
          currency: plan.currency,
          duration: `${plan.durationDays}${t("cheats.form.daysShort")}`,
          image: "",
          isAvailable: true,
          redirectUrl: plan.redirectUrl!,
          description: plan.description || undefined,
        }));

      // Найти выбранный бренд
      const selectedBrand = brands.find((brand) => brand.id === values.brandId);
      if (!selectedBrand) {
        throw new Error(t("cheats.form.selectedBrandNotFound"));
      }

      const dto: CreateCheatDto = {
        gameId: values.gameId,
        name: selectedBrand.name, // Сгенерировать имя из названия бренда
        brandId: values.brandId,
        reviewDigitalSeller: reviewDigitalSeller.length > 0 ? reviewDigitalSeller : undefined,
        description: values.description || "",
        descriptionMarkdown: descriptionMarkdown || undefined,
        circularText: "",
        image: cheatImage,
        price: {
          amount: plans.length > 0 ? plans[0].price : null,
          currency: plans.length > 0 ? plans[0].currency : "RUB",
        },
        productName: selectedBrand.name, // Сгенерировать productName из названия бренда
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
        seoText: seoText || undefined,
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
      // Обработка ошибок осуществляется в хуке мутации
    }
  };

  if (isEditMode && cheatLoading) {
    return <div>{t("cheats.form.loading")}</div>;
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
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/cheats")}
            >
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
              {/* Раздел 1: Основная информация */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Styled.SectionTitle>
                  {t("cheats.form.basicInfo")}
                </Styled.SectionTitle>
                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: "100%" }}
                >
                  <Form.Item
                    name="gameId"
                    label={t("cheats.form.game")}
                    rules={[
                      {
                        required: true,
                        message: t("cheats.form.gameRequired"),
                      },
                    ]}
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
                    rules={[
                      {
                        required: true,
                        message: t("cheats.form.brandNameRequired"),
                      },
                    ]}
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
                    rules={[
                      {
                        required: true,
                        message: t("cheats.form.statusRequired"),
                      },
                    ]}
                    initialValue="AVAILABLE"
                  >
                    <Select size="large">
                      <Select.Option value="AVAILABLE">
                        {t("cheats.available")}
                      </Select.Option>
                      <Select.Option value="UPDATING">
                        {t("cheats.updating")}
                      </Select.Option>
                      <Select.Option value="FROZEN">
                        {t("cheats.frozen")}
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Space>
              </motion.div>

              <Divider />

              {/* Раздел: Описание в формате Markdown */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Styled.SectionTitle>
                  {t("cheats.form.descriptionMarkdown")}
                </Styled.SectionTitle>
                <Form.Item>
                  <MarkdownEditor
                    value={descriptionMarkdown}
                    onChange={setDescriptionMarkdown}
                    placeholder={t(
                      "cheats.form.descriptionMarkdownPlaceholder"
                    )}
                  />
                </Form.Item>
              </motion.div>

              <Divider />

              {/* Раздел: Изображение чита */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
              >
                <Styled.SectionTitle>
                  {t("cheats.form.cheatImage") || "Изображение чита"}
                </Styled.SectionTitle>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Space>
                    <span>Файл</span>
                    <Switch
                      checked={cheatImageMode === 'url'}
                      onChange={(checked) => setCheatImageMode(checked ? 'url' : 'file')}
                      checkedChildren="URL"
                      unCheckedChildren="Файл"
                    />
                    <span>URL</span>
                  </Space>
                  {cheatImageMode === 'file' ? (
                    <Form.Item>
                      <CheatImageUpload
                        value={cheatImage}
                        onChange={setCheatImage}
                      />
                    </Form.Item>
                  ) : (
                    <Form.Item>
                      <Input
                        placeholder={t("cheats.form.enterImageUrl")}
                        value={cheatImageUrl}
                        onChange={(e) => {
                          setCheatImageUrl(e.target.value);
                          setCheatImage(e.target.value);
                        }}
                        size="large"
                      />
                    </Form.Item>
                  )}
                </Space>
              </motion.div>

              <Divider />

              {/* Раздел 2: Скриншоты */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Styled.SectionTitle>
                  {t("cheats.form.screenshots")}
                </Styled.SectionTitle>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Space>
                    <span>Файл</span>
                    <Switch
                      checked={screenshotsMode === 'url'}
                      onChange={(checked) => setScreenshotsMode(checked ? 'url' : 'file')}
                      checkedChildren="URL"
                      unCheckedChildren="Файл"
                    />
                    <span>URL</span>
                  </Space>
                  {screenshotsMode === 'file' ? (
                    <Form.Item>
                      <ScreenshotsUpload
                        value={screenshots}
                        onChange={setScreenshots}
                      />
                    </Form.Item>
                  ) : (
                    <Form.Item>
                      <Input.TextArea
                        placeholder={t("cheats.form.enterScreenshotsUrls")}
                        value={screenshotsUrls.join('\n')}
                        onChange={(e) => {
                          const urls = e.target.value.split('\n').filter(url => url.trim());
                          setScreenshotsUrls(urls);
                          setScreenshots(urls);
                        }}
                        rows={4}
                        size="large"
                      />
                    </Form.Item>
                  )}
                </Space>
              </motion.div>

              <Divider />

              {/* Раздел 2.5: Круглое изображение */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Styled.SectionTitle>
                  {t("cheats.form.circularImage")}
                </Styled.SectionTitle>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Space>
                    <span>Файл</span>
                    <Switch
                      checked={circularImageMode === 'url'}
                      onChange={(checked) => setCircularImageMode(checked ? 'url' : 'file')}
                      checkedChildren="URL"
                      unCheckedChildren="Файл"
                    />
                    <span>URL</span>
                  </Space>
                  {circularImageMode === 'file' ? (
                    <Form.Item>
                      <CircularImageUpload
                        value={circularImage}
                        onChange={setCircularImage}
                      />
                    </Form.Item>
                  ) : (
                    <Form.Item>
                      <Input
                        placeholder={t("cheats.form.enterCircularImageUrl")}
                        value={circularImageUrl}
                        onChange={(e) => {
                          setCircularImageUrl(e.target.value);
                          setCircularImage(e.target.value);
                        }}
                        size="large"
                      />
                    </Form.Item>
                  )}
                </Space>
              </motion.div>

              <Divider />

              {/* Раздел 2.6: Загрузка видео */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.27 }}
              >
                <Styled.SectionTitle>
                  {t("cheats.form.video") || "Видео (MP4/MPEG)"}
                </Styled.SectionTitle>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Space>
                    <span>Файл</span>
                    <Switch
                      checked={videoMode === 'url'}
                      onChange={(checked) => setVideoMode(checked ? 'url' : 'file')}
                      checkedChildren="URL"
                      unCheckedChildren="Файл"
                    />
                    <span>URL</span>
                  </Space>
                  {videoMode === 'file' ? (
                    <Form.Item>
                      <VideoUpload value={videoUrl} onChange={setVideoUrl} />
                    </Form.Item>
                  ) : (
                    <Form.Item>
                      <Input
                        placeholder={t("cheats.form.enterVideoUrl")}
                        value={videoUrlInput}
                        onChange={(e) => {
                          setVideoUrlInput(e.target.value);
                          setVideoUrl(e.target.value);
                        }}
                        size="large"
                      />
                    </Form.Item>
                  )}
                </Space>
              </motion.div>

              <Divider />

              {/* Раздел 3: Списки функций */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Form.Item>
                  <FunctionListsManager
                    value={functionLists}
                    onChange={setFunctionLists}
                  />
                </Form.Item>
              </motion.div>

              <Divider />

              {/* Раздел 4: Тарифные планы */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Form.Item>
                  <PricingPlansManager
                    value={pricingPlans}
                    onChange={setPricingPlans}
                  />
                </Form.Item>
              </motion.div>

              <Divider />

              {/* Раздел 5: Digital Seller информация */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <Form.Item>
                  <ReviewDigitalSellerManager
                    value={reviewDigitalSeller}
                    onChange={setReviewDigitalSeller}
                  />
                </Form.Item>
              </motion.div>

              <Divider />

              {/* Раздел 6: SEO настройки */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Styled.SectionTitle>
                  {t("cheats.form.seoSettings") || "SEO настройки"}
                </Styled.SectionTitle>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Form.Item
                    label={t("cheats.form.seoText") || "SEO ключевые слова"}
                    tooltip={t("cheats.form.seoTextTooltip") || "Ключевые слова для поисковых систем, разделенные запятыми"}
                  >
                    <Input.TextArea
                      placeholder={t("cheats.form.seoTextPlaceholder") || "aimbot, wallhack, esp, battlefield 2042 cheat"}
                      value={seoText}
                      onChange={(e) => setSeoText(e.target.value)}
                      rows={3}
                      size="large"
                    />
                  </Form.Item>
                </Space>
              </motion.div>
            </Form>
          </Card>
        </motion.div>

        {/* Фиксированный футер */}
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
