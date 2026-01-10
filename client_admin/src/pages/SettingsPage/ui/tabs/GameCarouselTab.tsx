import { Card, Form, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { GameCarouselTab as GameCarouselFeature } from "@/features/game-carousel";
import { CarouselCategoryGames } from "@/entities/settings";

interface GameCarouselTabProps {
  form: any;
  settings: any;
  onSubmit: (values: { gameIdsForCarousel?: CarouselCategoryGames[] }) => void;
  isUpdating: boolean;
}

export function GameCarouselTab({ form, settings, onSubmit, isUpdating }: GameCarouselTabProps) {
  const { t } = useTranslation();

  return (
    <Card title={t("settings.gameCarouselSettings")}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          gameIdsForCarousel: settings?.gameIdsForCarousel || [],
        }}
        onFinish={onSubmit}
      >
        <Form.Item name="gameIdsForCarousel">
          <GameCarouselFeature
            value={form.getFieldValue("gameIdsForCarousel")}
            onChange={(gameIds) => {
              form.setFieldsValue({
                gameIdsForCarousel: gameIds,
              });
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={isUpdating}
            size="large"
          >
            {t("settings.saveSettings")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
