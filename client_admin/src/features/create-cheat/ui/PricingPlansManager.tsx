import { useState, useEffect } from "react";
import { Card, Button, InputNumber, Select, Space, Typography, Input } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import * as Styled from "./styled";

const { Title, Text } = Typography;

export interface PricingPlan {
  id: string;
  price: number;
  durationDays: number;
  currency: "RUB" | "USD";
  redirectUrl: string;
  description?: string;
}

interface PricingPlansManagerProps {
  value?: PricingPlan[];
  onChange?: (plans: PricingPlan[]) => void;
}

export function PricingPlansManager({ value = [], onChange }: PricingPlansManagerProps) {
  const { t } = useTranslation();
  const [plans, setPlans] = useState<PricingPlan[]>(value);

  // Sync internal state with external value prop
  useEffect(() => {
    setPlans(value);
  }, [value]);

  const handleAddPlan = () => {
    const newPlan: PricingPlan = {
      id: `plan-${Date.now()}`,
      price: 0,
      durationDays: 1,
      currency: "RUB",
      redirectUrl: "",
      description: "",
    };
    const updated = [...plans, newPlan];
    setPlans(updated);
    onChange?.(updated);
  };

  const handleRemovePlan = (id: string) => {
    const updated = plans.filter((plan) => plan.id !== id);
    setPlans(updated);
    onChange?.(updated);
  };

  const handleUpdatePlan = (id: string, field: keyof PricingPlan, newValue: number | string) => {
    const updated = plans.map((plan) =>
      plan.id === id ? { ...plan, [field]: newValue } : plan
    );
    setPlans(updated);
    onChange?.(updated);
  };

  return (
    <Styled.PricingPlansContainer>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Title level={5} style={{ margin: 0 }}>
            {t("cheats.form.pricingPlans")}
          </Title>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={handleAddPlan}
            size="small"
          >
            {t("cheats.form.addPricingPlan")}
          </Button>
        </Space>

        <AnimatePresence>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Card
                size="small"
                style={{ marginBottom: 16 }}
                extra={
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemovePlan(plan.id)}
                    size="small"
                  />
                }
              >
                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                  <Space direction="vertical" size="small" style={{ width: "100%" }}>
                    <Text strong style={{ fontSize: 12 }}>
                      {t("cheats.form.planDescription")}
                    </Text>
                    <Input.TextArea
                      placeholder={t("cheats.form.planDescriptionPlaceholder")}
                      value={plan.description || ""}
                      onChange={(e) => handleUpdatePlan(plan.id, "description", e.target.value)}
                      rows={2}
                      style={{ width: "100%" }}
                    />
                  </Space>
                  <Space style={{ width: "100%" }}>
                    <Styled.PriceInputWrapper>
                      <InputNumber
                        min={0}
                        step={1}
                        placeholder={t("cheats.form.pricePlaceholder")}
                        value={plan.price}
                        onChange={(val) => handleUpdatePlan(plan.id, "price", val || 0)}
                        style={{ width: "100%" }}
                        addonAfter={
                          <Select
                            value={plan.currency}
                            onChange={(val) => handleUpdatePlan(plan.id, "currency", val)}
                            style={{ width: 80 }}
                          >
                            <Select.Option value="RUB">₽</Select.Option>
                            <Select.Option value="USD">$</Select.Option>
                          </Select>
                        }
                      />
                    </Styled.PriceInputWrapper>
                    <Styled.DurationInputWrapper>
                      <InputNumber
                        min={1}
                        step={1}
                        placeholder={t("cheats.form.durationDaysPlaceholder")}
                        value={plan.durationDays}
                        onChange={(val) => handleUpdatePlan(plan.id, "durationDays", val || 1)}
                        addonAfter={t("cheats.form.days")}
                        style={{ width: "100%" }}
                      />
                    </Styled.DurationInputWrapper>
                  </Space>
                  <Space direction="vertical" size="small" style={{ width: "100%" }}>
                    <Text strong style={{ fontSize: 12 }}>
                      {t("cheats.form.redirectUrl")} <Text type="danger">*</Text>
                    </Text>
                    <Input
                      type="url"
                      placeholder={t("cheats.form.redirectUrlPlaceholder") || "https://example.com/buy"}
                      value={plan.redirectUrl || ""}
                      onChange={(e) => handleUpdatePlan(plan.id, "redirectUrl", e.target.value)}
                      status={!plan.redirectUrl || plan.redirectUrl.trim() === "" ? "error" : undefined}
                      style={{ width: "100%" }}
                      required
                    />
                    {(!plan.redirectUrl || plan.redirectUrl.trim() === "") && (
                      <Text type="danger" style={{ fontSize: 12 }}>
                        {t("cheats.form.redirectUrlRequired") || "Redirect URL is required"}
                      </Text>
                    )}
                  </Space>
                  <Styled.PlanPreview>
                    {plan.price > 0 && plan.durationDays > 0
                      ? `${plan.price}${plan.currency === "RUB" ? "₽" : "$"} - ${plan.durationDays}${t("cheats.form.daysShort")}`
                      : t("cheats.form.fillPlanFields")}
                  </Styled.PlanPreview>
                </Space>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {plans.length === 0 && (
          <Styled.EmptyState>
            <Text type="secondary">
              {t("cheats.form.noPricingPlans")}
            </Text>
          </Styled.EmptyState>
        )}
      </Space>
    </Styled.PricingPlansContainer>
  );
}

