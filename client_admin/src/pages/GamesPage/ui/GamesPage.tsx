import { useState, useMemo } from "react";
import { Button, Table, Image, Input } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  SearchOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getGames, gameKeys, Game } from "@/entities/game";
import { CreateGameModal } from "@/features/create-game";
import { EditGameModal } from "@/features/edit-game";
import * as Styled from "./styled";

const { Search } = Input;

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function GamesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();

  const { data: games = [], isLoading } = useQuery({
    queryKey: gameKeys.lists(),
    queryFn: getGames,
  });

  // Filter games based on search text
  const filteredGames = useMemo(() => {
    if (!searchText) {
      return games;
    }
    const searchLower = searchText.toLowerCase();
    return games.filter((game) => {
      return (
        game.name.toLowerCase().includes(searchLower) ||
        game.color.toLowerCase().includes(searchLower)
      );
    });
  }, [games, searchText]);

  const handleClearFilters = () => {
    setSearchText("");
  };

  const columns = [
    {
      title: t("games.image"),
      dataIndex: "image",
      key: "image",
      width: 120,
      render: (image: string | undefined) => {
        if (!image) {
          return <Styled.NoImagePlaceholder>-</Styled.NoImagePlaceholder>;
        }
        return (
          <Image
            src={image}
            alt="Game"
            width={80}
            height={80}
            style={{ objectFit: "cover", borderRadius: 4 }}
            preview={{
              mask: t("games.preview"),
            }}
          />
        );
      },
    },
    {
      title: t("games.name"),
      dataIndex: "name",
      key: "name",
      render: (name: string, record: Game) => (
        <Styled.ClickableName
          onClick={() => {
            setSelectedGame(record);
            setIsEditModalOpen(true);
          }}
        >
          {name}
        </Styled.ClickableName>
      ),
    },
    {
      title: t("games.color"),
      dataIndex: "color",
      key: "color",
      render: (color: string) => (
        <Styled.ColorCell>
          <Styled.ColorSquare color={color} />
          <span>{color}</span>
        </Styled.ColorCell>
      ),
    },
    {
      title: t("games.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: t("games.updatedAt"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: t("games.actions"),
      key: "actions",
      width: 100,
      render: (_: unknown, record: Game) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => {
            setSelectedGame(record);
            setIsEditModalOpen(true);
          }}
        >
          {t("games.edit")}
        </Button>
      ),
    },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Styled.Container>
        <Styled.Header>
          <div>
            <Styled.Title>{t("games.title")}</Styled.Title>
            <Styled.Subtitle>{t("games.subtitle")}</Styled.Subtitle>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            {t("games.createGame")}
          </Button>
        </Styled.Header>

        <CreateGameModal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
        />

        <EditGameModal
          open={isEditModalOpen}
          game={selectedGame}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedGame(null);
          }}
        />

        <Styled.FiltersCard>
          <Styled.FiltersRow>
            <div>
              <label
                style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
              >
                {t("games.filters.searchGame")}
              </label>
              <Search
                placeholder={t("games.filters.searchGamePlaceholder")}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
                prefix={<SearchOutlined />}
                size="large"
              />
            </div>
            <div>
              <Button
                icon={<ClearOutlined />}
                onClick={handleClearFilters}
                size="large"
                disabled={!searchText}
              >
                {t("games.filters.clearFilters")}
              </Button>
            </div>
          </Styled.FiltersRow>
        </Styled.FiltersCard>

        <Styled.TableCard>
          <Styled.TableWrapper>
            <Table
              dataSource={filteredGames}
              columns={columns}
              rowKey="id"
              loading={isLoading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} ${t("common.of")} ${total} ${t(
                    "common.items"
                  )}`,
                responsive: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                showQuickJumper: true,
              }}
              scroll={{ x: "max-content" }}
            />
          </Styled.TableWrapper>
        </Styled.TableCard>
      </Styled.Container>
    </motion.div>
  );
}
