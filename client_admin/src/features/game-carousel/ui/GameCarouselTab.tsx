"use client";

import React from "react";
import { Select, Button, List, Avatar, Popconfirm, Spin } from "antd";
import { DeleteOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { Category } from "@/entities/category";
import { EditGameModal } from "@/features/edit-game";
import { useGameCarouselTab } from "../hooks/useGameCarouselTab";
import * as Styled from "./styled";

interface GameCarouselTabProps {
  value?: string[];
  onChange?: (gameIds: string[]) => void;
}

export function GameCarouselTab({
  value = [],
  onChange,
}: GameCarouselTabProps) {
  // Ensure value is an array of strings
  const normalizedValue = React.useMemo(() => {
    console.log("GameCarouselTab: received value", value, typeof value);
    if (!Array.isArray(value)) {
      console.warn("GameCarouselTab: value is not an array", value);
      return [];
    }
    const normalized = value.map((id) => String(id));
    console.log("GameCarouselTab: normalized value", normalized);
    return normalized;
  }, [value]);

  const {
    selectedGameId,
    setSelectedGameId,
    isEditModalOpen,
    selectedGame,
    selectedCategoryId,
    setSelectedCategoryId,
    categories,
    availableGames,
    selectedGames,
    currentGameIds,
    isGamesLoading,
    isCategoriesLoading,
    handleAddGame,
    handleDelete,
    handleEdit,
    handleCloseEditModal,
    t,
  } = useGameCarouselTab({ value: normalizedValue, onChange });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  if (isGamesLoading || isCategoriesLoading) {
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

  return (
    <Styled.Container>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Styled.AddGameSection>
          {/* Category Filter Select */}
          <Styled.CategorySelectWrapper>
            <Select
              placeholder={t("settings.selectCategory") || "Выберите категорию"}
              value={selectedCategoryId}
              onChange={setSelectedCategoryId}
              style={{ width: "100%", marginBottom: 16 }}
              allowClear
            >
              <Select.Option value={null}>
                {t("settings.allCategories") || "Все категории"}
              </Select.Option>
              {categories.map((category: Category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Styled.CategorySelectWrapper>

          <Styled.SelectWrapper>
            <Select
              placeholder={t("settings.selectGame")}
              value={selectedGameId}
              onChange={setSelectedGameId}
              style={{ flex: 1 }}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                String(option?.children || "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {availableGames.map((game) => (
                <Select.Option key={game.id} value={game.id}>
                  {game.name}
                </Select.Option>
              ))}
            </Select>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddGame}
              disabled={!selectedGameId}
              style={{ marginLeft: 8 }}
            >
              {t("settings.addGame")}
            </Button>
          </Styled.SelectWrapper>
        </Styled.AddGameSection>

        {currentGameIds.length > 0 && (
          <motion.div variants={itemVariants}>
            <Styled.GamesList>
              <List
                dataSource={selectedGames}
                renderItem={(game) => (
                  <List.Item
                    actions={[
                      <Button
                        key="edit"
                        type="link"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEdit(game)}
                      >
                        {t("common.edit")}
                      </Button>,
                      <Popconfirm
                        key="delete"
                        title={t("settings.removeGameConfirm")}
                        onConfirm={() => handleDelete(game.id)}
                        okText={t("common.yes")}
                        cancelText={t("common.no")}
                      >
                        <Button danger icon={<DeleteOutlined />} size="small">
                          {t("common.delete")}
                        </Button>
                      </Popconfirm>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={game.icon || game.image}
                          size={64}
                          shape="circle"
                          style={{ border: "2px solid #1890ff" }}
                        >
                          {!game.icon && !game.image && game.name.charAt(0)}
                        </Avatar>
                      }
                      title={game.name}
                      description={
                        <div style={{ color: "#8c8c8c", fontSize: "12px" }}>
                          ID: {game.id}
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
              {selectedGames.length === 0 && selectedCategoryId && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#8c8c8c",
                    fontSize: "14px",
                  }}
                >
                  {t("settings.noGamesInCategory") ||
                    "В выбранной категории нет добавленных игр"}
                </div>
              )}
            </Styled.GamesList>
          </motion.div>
        )}

        {currentGameIds.length === 0 && (
          <motion.div variants={itemVariants}>
            <Styled.EmptyState>
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 0",
                  color: "#8c8c8c",
                }}
              >
                <Avatar
                  size={80}
                  style={{ marginBottom: 16, backgroundColor: "#f0f0f0" }}
                >
                  <PlusOutlined style={{ fontSize: 32, color: "#8c8c8c" }} />
                </Avatar>
                <div style={{ fontSize: 16, marginBottom: 8 }}>
                  {t("settings.noGamesSelected")}
                </div>
                <div style={{ fontSize: 14 }}>
                  {t("settings.selectGamesForCarousel")}
                </div>
              </div>
            </Styled.EmptyState>
          </motion.div>
        )}

        <EditGameModal
          open={isEditModalOpen}
          game={selectedGame}
          onCancel={handleCloseEditModal}
        />
      </motion.div>
    </Styled.Container>
  );
}
