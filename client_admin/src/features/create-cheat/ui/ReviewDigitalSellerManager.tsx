import { useState, useEffect } from "react";
import { Card, Button, Input, Space, Typography } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

export interface ReviewDigitalSellerItem {
  sellerId: string;
  productId: string;
}

interface ReviewDigitalSellerManagerProps {
  value?: ReviewDigitalSellerItem[];
  onChange?: (items: ReviewDigitalSellerItem[]) => void;
}

export function ReviewDigitalSellerManager({ value = [], onChange }: ReviewDigitalSellerManagerProps) {
  const { t } = useTranslation();
  const [items, setItems] = useState<ReviewDigitalSellerItem[]>(value);

  // Sync internal state with external value prop
  useEffect(() => {
    setItems(value);
  }, [value]);

  const handleAddItem = () => {
    const newItem: ReviewDigitalSellerItem = {
      sellerId: "",
      productId: "",
    };
    const updated = [...items, newItem];
    setItems(updated);
    onChange?.(updated);
  };

  const handleRemoveItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    onChange?.(updated);
  };

  const handleUpdateItem = (index: number, field: keyof ReviewDigitalSellerItem, newValue: string) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: newValue } : item
    );
    setItems(updated);
    onChange?.(updated);
  };

  return (
    <Card>
      <Title level={5}>
        {t("cheats.form.reviewDigitalSeller") || "Digital Seller Review Information"}
      </Title>

      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: 16 }}
          >
            <Card size="small" style={{ marginBottom: 8 }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Space>
                  <Input
                    placeholder={t("cheats.form.sellerId") || "Seller ID"}
                    value={item.sellerId}
                    onChange={(e) => handleUpdateItem(index, "sellerId", e.target.value)}
                    style={{ width: 200 }}
                  />
                  <Input
                    placeholder={t("cheats.form.productId") || "Product ID"}
                    value={item.productId}
                    onChange={(e) => handleUpdateItem(index, "productId", e.target.value)}
                    style={{ width: 200 }}
                  />
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveItem(index)}
                  />
                </Space>
              </Space>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={handleAddItem}
        block
      >
        {t("cheats.form.addSeller") || "Add Seller"}
      </Button>
    </Card>
  );
}
