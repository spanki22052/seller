import { Form, Input, Button, Select, InputNumber } from "antd";
import { useTranslation } from "react-i18next";
import { useCreateCheat } from "../hooks/useCreateCheat";
import { CreateCheatDto } from "@/entities/cheat";
import { useQuery } from "@tanstack/react-query";
import { getGames, gameKeys } from "@/entities/game";
import * as Styled from "./styled";

const { TextArea } = Input;

export function CreateCheatForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const createCheat = useCreateCheat();

  const { data: games = [], isLoading: gamesLoading } = useQuery({
    queryKey: gameKeys.lists(),
    queryFn: getGames,
  });

  const handleSubmit = async (values: CreateCheatDto) => {
    await createCheat.mutateAsync(values);
    form.resetFields();
    onSuccess?.();
  };

  return (
    <Styled.FormWrapper>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={createCheat.isPending}
      >
        <Form.Item
          name="name"
          label={t("cheats.form.cheatName")}
          rules={[{ required: true, message: t("cheats.form.cheatNameRequired") }]}
        >
          <Input placeholder={t("cheats.form.cheatNamePlaceholder")} />
        </Form.Item>

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
          >
            {games.map((game) => (
              <Select.Option key={game.id} value={game.id}>
                {game.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="price"
          label={t("cheats.form.price")}
          rules={[{ required: true, message: t("cheats.form.priceRequired") }]}
        >
          <InputNumber
            min={0}
            step={0.01}
            placeholder={t("cheats.form.pricePlaceholder")}
            style={{ width: "100%" }}
            prefix="$"
          />
        </Form.Item>

        <Form.Item name="description" label={t("cheats.form.description")}>
          <TextArea rows={4} placeholder={t("cheats.form.descriptionPlaceholder")} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={createCheat.isPending}
            block
          >
            {t("cheats.createCheat")}
          </Button>
        </Form.Item>
      </Form>
    </Styled.FormWrapper>
  );
}

