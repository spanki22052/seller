import { useState, useEffect } from "react";
import { Card, Button, Input, Space, Typography } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import * as Styled from "./styled";

const { TextArea } = Input;
const { Title, Text } = Typography;

export interface FunctionList {
  id: string;
  name: string;
  features: string; // Textarea content with features separated by dashes
}

interface FunctionListsManagerProps {
  value?: FunctionList[];
  onChange?: (lists: FunctionList[]) => void;
}

export function FunctionListsManager({ value = [], onChange }: FunctionListsManagerProps) {
  const { t } = useTranslation();
  const [lists, setLists] = useState<FunctionList[]>(value);

  // Sync internal state with external value prop
  useEffect(() => {
    setLists(value);
  }, [value]);

  const handleAddList = () => {
    const newList: FunctionList = {
      id: `list-${Date.now()}`,
      name: "",
      features: "",
    };
    const updated = [...lists, newList];
    setLists(updated);
    onChange?.(updated);
  };

  const handleRemoveList = (id: string) => {
    const updated = lists.filter((list) => list.id !== id);
    setLists(updated);
    onChange?.(updated);
  };

  const handleUpdateList = (id: string, field: keyof FunctionList, newValue: string) => {
    const updated = lists.map((list) =>
      list.id === id ? { ...list, [field]: newValue } : list
    );
    setLists(updated);
    onChange?.(updated);
  };

  return (
    <Styled.FunctionListsContainer>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Title level={5} style={{ margin: 0 }}>
            {t("cheats.form.functionLists")}
          </Title>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={handleAddList}
            size="small"
          >
            {t("cheats.form.addFunctionList")}
          </Button>
        </Space>

        <AnimatePresence>
          {lists.map((list, index) => (
            <motion.div
              key={list.id}
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
                    onClick={() => handleRemoveList(list.id)}
                    size="small"
                  />
                }
              >
                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                  <Input
                    placeholder={t("cheats.form.functionListNamePlaceholder")}
                    value={list.name}
                    onChange={(e) => handleUpdateList(list.id, "name", e.target.value)}
                  />
                  <TextArea
                    rows={6}
                    placeholder={t("cheats.form.functionListFeaturesPlaceholder")}
                    value={list.features}
                    onChange={(e) => handleUpdateList(list.id, "features", e.target.value)}
                  />
                </Space>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {lists.length === 0 && (
          <Styled.EmptyState>
            <Text type="secondary">
              {t("cheats.form.noFunctionLists")}
            </Text>
          </Styled.EmptyState>
        )}
      </Space>
    </Styled.FunctionListsContainer>
  );
}

