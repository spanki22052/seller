import { Form, Input, Button, Select, InputNumber } from "antd";
import { useTranslation } from "react-i18next";
import { useCreateCheat } from "../hooks/useCreateCheat";
import { CreateCheatDto } from "@/entities/cheat";
import { useQuery } from "@tanstack/react-query";
import { getGames, gameKeys } from "@/entities/game";
import { getBrands, brandKeys } from "@/entities/brand";
import * as Styled from "./styled";

interface CreateCheatFormValues {
  gameId: string;
  brandId: string;
  price: number;
  description?: string;
}

const { TextArea } = Input;

export function CreateCheatForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const createCheat = useCreateCheat();

  const { data: games = [], isLoading: gamesLoading } = useQuery({
    queryKey: gameKeys.lists(),
    queryFn: getGames,
  });

  const { data: brands = [], isLoading: brandsLoading } = useQuery({
    queryKey: brandKeys.lists(),
    queryFn: getBrands,
  });

  const handleSubmit = async (values: CreateCheatFormValues) => {
    // Find selected brand
    const selectedBrand = brands.find((brand) => brand.id === values.brandId);
    if (!selectedBrand) {
      throw new Error("Selected brand not found");
    }

    // Automatically generate name from brand name
    const dto: CreateCheatDto = {
      gameId: values.gameId,
      brandId: values.brandId,
      description: values.description,
      name: selectedBrand.name, // Use brand name as cheat name
      productName: selectedBrand.name, // Use brand name as product name
      price: {
        amount: values.price,
        currency: "USD",
      },
      breadcrumbs: [], // Empty breadcrumbs for simple form
    };

    await createCheat.mutateAsync(dto);
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
          name="brandId"
          label={t("cheats.form.brandName")}
          rules={[
            { required: true, message: t("cheats.form.brandNameRequired") },
          ]}
        >
          <Select
            placeholder={t("cheats.form.brandNamePlaceholder")}
            loading={brandsLoading}
            showSearch
            optionFilterProp="children"
          >
            {brands.map((brand) => (
              <Select.Option key={brand.id} value={brand.id}>
                {brand.name}
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
          <TextArea
            rows={4}
            placeholder={t("cheats.form.descriptionPlaceholder")}
          />
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
