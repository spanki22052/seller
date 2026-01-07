import { Card, Form, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { GameCircularIconsTab } from "@/features/game-circular-icons";

interface GameIconsTabProps {
  form: any;
  settings: any;
  onSubmit: (values: { gameIdsForIcons?: string[] }) => void;
  isUpdating: boolean;
}

export function GameIconsTab({ form, settings, onSubmit, isUpdating }: GameIconsTabProps) {
  const { t } = useTranslation();

  return (
    <Card title={t("settings.gameIconsSettings")}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          gameIdsForIcons: settings?.gameIdsForIcons || [],
        }}
        onFinish={onSubmit}
      >
        <Form.Item name="gameIdsForIcons">
          <GameCircularIconsTab
            value={form.getFieldValue("gameIdsForIcons")}
            onChange={(gameIds) => {
              form.setFieldsValue({ gameIdsForIcons: gameIds });
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
