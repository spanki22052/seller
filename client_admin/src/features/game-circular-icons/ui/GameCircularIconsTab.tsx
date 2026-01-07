"use client";

import React, { useState } from "react";
import { Select, Button, List, Avatar, Popconfirm, message, Spin } from "antd";
import { DeleteOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getGames, gameKeys, Game } from "@/entities/game";
import { EditGameModal } from "@/features/edit-game";
import * as Styled from "./styled";

interface GameCircularIconsTabProps {
  value?: string[];
  onChange?: (gameIds: string[]) => void;
}

export function GameCircularIconsTab({ value = [], onChange }: GameCircularIconsTabProps) {
  const { t } = useTranslation();
  const [selectedGameId, setSelectedGameId] = useState<string>("");
  const [localGameIds, setLocalGameIds] = useState<string[]>(value);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const { data: games = [], isLoading } = useQuery({
    queryKey: gameKeys.lists(),
    queryFn: getGames,
  });

  // Sync local state with external value
  React.useEffect(() => {
    setLocalGameIds(value);
  }, [value]);

  // Filter out already selected games
  const availableGames = games.filter(game => !localGameIds.includes(game.id));

  const handleAddGame = () => {
    if (!selectedGameId) return;

    const newGameIds = [...localGameIds, selectedGameId];
    setLocalGameIds(newGameIds);
    onChange?.(newGameIds);
    setSelectedGameId("");
    message.success(t("settings.gameAdded"));
  };

  const handleDelete = (gameId: string) => {
    const newGameIds = localGameIds.filter(id => id !== gameId);
    setLocalGameIds(newGameIds);
    onChange?.(newGameIds);
    message.success(t("settings.gameRemoved"));
  };

  const handleEdit = (game: Game) => {
    setSelectedGame(game);
    setIsEditModalOpen(true);
  };

  const selectedGames = games.filter(game => localGameIds.includes(game.id));

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

  if (isLoading) {
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
          <Styled.SelectWrapper>
            <Select
              placeholder={t("settings.selectGame")}
              value={selectedGameId}
              onChange={setSelectedGameId}
              style={{ flex: 1 }}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                String(option?.children || '').toLowerCase().includes(input.toLowerCase())
              }
            >
              {availableGames.map(game => (
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
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          size="small"
                        >
                          {t("common.delete")}
                        </Button>
                      </Popconfirm>
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
              <div style={{ textAlign: "center", padding: "40px 0", color: "#8c8c8c" }}>
                <Avatar size={80} style={{ marginBottom: 16, backgroundColor: "#f0f0f0" }}>
                  <PlusOutlined style={{ fontSize: 32, color: "#8c8c8c" }} />
                </Avatar>
                <div style={{ fontSize: 16, marginBottom: 8 }}>
                  {t("settings.noGamesSelected")}
                </div>
                <div style={{ fontSize: 14 }}>
                  {t("settings.selectGamesToDisplay")}
                </div>
              </div>
            </Styled.EmptyState>
          </motion.div>
        )}

        <EditGameModal
          open={isEditModalOpen}
          game={selectedGame}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedGame(null);
          }}
        />
      </motion.div>
    </Styled.Container>
  );
}