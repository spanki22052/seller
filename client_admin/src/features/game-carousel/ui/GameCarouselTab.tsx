"use client";

import React from "react";
import { Select, Button, List, Avatar, Popconfirm, Spin } from "antd";
import { DeleteOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { CarouselCategory } from "@/entities/carousel-category";
import { CarouselCategoryGames } from "@/entities/settings/api/settingsApi";
import { EditGameModal } from "@/features/edit-game";
import { useGameCarouselTab } from "../hooks/useGameCarouselTab";
import * as Styled from "./styled";

interface GameCarouselTabProps {
  value?: CarouselCategoryGames[];
  onChange?: (carouselData: CarouselCategoryGames[]) => void;
}

export function GameCarouselTab({
  value = [],
  onChange,
}: GameCarouselTabProps) {
  // Ensure value is an array of CarouselCategoryGames
  const normalizedValue = React.useMemo(() => {
    console.log("GameCarouselTab: received value", value, typeof value);
    if (!Array.isArray(value)) {
      console.warn("GameCarouselTab: value is not an array", value);
      return [];
    }
    return value as CarouselCategoryGames[];
  }, [value]);

  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    string | null
  >(null);

  // Get current category's game IDs
  const currentCategoryData = React.useMemo(() => {
    return normalizedValue.find((cat) => cat.id === selectedCategoryId);
  }, [normalizedValue, selectedCategoryId]);

  const currentGameIds = currentCategoryData?.games || [];

  // Set default category when categories load
  const { carouselCategories, isCarouselCategoriesLoading } =
    useGameCarouselTab({ value: [], onChange: () => {} });

  React.useEffect(() => {
    if (carouselCategories.length > 0 && selectedCategoryId === null) {
      setSelectedCategoryId(carouselCategories[0].id);
    }
  }, [carouselCategories, selectedCategoryId]);

  const {
    selectedGameId,
    setSelectedGameId,
    isEditModalOpen,
    selectedGame,
    availableGames,
    selectedGames,
    isGamesLoading,
    handleAddGame,
    handleDelete,
    handleEdit,
    handleCloseEditModal,
    t,
  } = useGameCarouselTab({
    value: currentGameIds,
    onChange: (gameIds: string[]) => {
      if (!selectedCategoryId) return;

      // Update the carousel data with new game IDs for the selected category
      const updatedValue = [...normalizedValue];
      const existingIndex = updatedValue.findIndex(
        (cat) => cat.id === selectedCategoryId
      );

      if (existingIndex >= 0) {
        updatedValue[existingIndex] = {
          ...updatedValue[existingIndex],
          games: gameIds,
        };
      } else {
        updatedValue.push({ id: selectedCategoryId, games: gameIds });
      }

      onChange?.(updatedValue);
    },
  });

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

  if (isGamesLoading || isCarouselCategoriesLoading) {
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
          {/* Category Filter Buttons */}
          <Styled.CategoryButtons>
            <Styled.SectionTitle>
              {t("settings.selectCategory") || "Выберите категорию"}:
            </Styled.SectionTitle>
            <Styled.CategoryButtonGroup>
              {carouselCategories.map((carouselCategory: CarouselCategory) => (
                <Button
                  key={carouselCategory.id}
                  type={
                    selectedCategoryId === carouselCategory.id
                      ? "primary"
                      : "default"
                  }
                  onClick={() => setSelectedCategoryId(carouselCategory.id)}
                  size="small"
                >
                  {carouselCategory.name}
                </Button>
              ))}
            </Styled.CategoryButtonGroup>
          </Styled.CategoryButtons>

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

        {selectedGames.length > 0 && (
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
            </Styled.GamesList>
          </motion.div>
        )}

        {selectedGames.length === 0 && (
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
