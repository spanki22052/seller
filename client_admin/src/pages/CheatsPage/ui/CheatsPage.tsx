import { useState, useMemo } from "react";
import { Button, Table, Tag, Avatar, Input, Select } from "antd";
import { PlusOutlined, EditOutlined, SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCheats, cheatKeys, Cheat } from "@/entities/cheat";
import { getGames, gameKeys, Game } from "@/entities/game";
import { EditGameModal } from "@/features/edit-game";
import * as Styled from "./styled";

const { Search } = Input;

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function CheatsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isEditGameModalOpen, setIsEditGameModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  // Filter states
  const [searchText, setSearchText] = useState("");
  const [selectedGameId, setSelectedGameId] = useState<string | undefined>(undefined);
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);

  const { data: cheats = [], isLoading } = useQuery({
    queryKey: cheatKeys.lists(),
    queryFn: getCheats,
  });

  const { data: games = [] } = useQuery({
    queryKey: gameKeys.lists(),
    queryFn: getGames,
  });

  // Get unique brands from cheats
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    cheats.forEach((cheat) => {
      if (cheat.brandName) {
        brandSet.add(cheat.brandName);
      }
    });
    return Array.from(brandSet).sort();
  }, [cheats]);

  // Filter cheats based on filters
  const filteredCheats = useMemo(() => {
    return cheats.filter((cheat) => {
      // Search by cheat name
      if (searchText && !cheat.name.toLowerCase().includes(searchText.toLowerCase())) {
        return false;
      }
      
      // Filter by game
      if (selectedGameId && cheat.gameId !== selectedGameId) {
        return false;
      }
      
      // Filter by brand
      if (selectedBrand && cheat.brandName !== selectedBrand) {
        return false;
      }
      
      return true;
    });
  }, [cheats, searchText, selectedGameId, selectedBrand]);

  const handleClearFilters = () => {
    setSearchText("");
    setSelectedGameId(undefined);
    setSelectedBrand(undefined);
  };

  const columns = [
    {
      title: t("cheats.name"),
      dataIndex: "name",
      key: "name",
      render: (name: string, record: Cheat) => (
        <Styled.NameCell>
          <Avatar
            src={record.circularImage}
            size={40}
            style={{ flexShrink: 0 }}
          >
            {name?.charAt(0)?.toUpperCase() || "C"}
          </Avatar>
          <Styled.NameContent>
            <Styled.ClickableText
              onClick={() => navigate(`/cheats/edit/${record.id}`)}
              ellipsis={{ tooltip: name }}
              style={{ maxWidth: "100%" }}
            >
              {name}
            </Styled.ClickableText>
            {record.description && (
              <Styled.Description ellipsis={{ tooltip: record.description }}>
                {record.description}
              </Styled.Description>
            )}
          </Styled.NameContent>
        </Styled.NameCell>
      ),
    },
    {
      title: t("cheats.game"),
      dataIndex: "gameName",
      key: "gameName",
      render: (gameName: string, record: Cheat) => {
        const handleGameClick = () => {
          const game = games.find((g) => g.id === record.gameId);
          if (game) {
            setSelectedGame(game);
            setIsEditGameModalOpen(true);
          }
        };
        return (
          <Styled.ClickableName onClick={handleGameClick}>
            {gameName}
          </Styled.ClickableName>
        );
      },
    },
    {
      title: t("cheats.price"),
      dataIndex: "pricingPlans",
      key: "pricingPlans",
      render: (pricingPlans: Cheat["pricingPlans"]) => {
        if (!pricingPlans || pricingPlans.length === 0) {
          return `0 ${t("cheats.plans")}`;
        }
        const count = pricingPlans.length;
        if (count === 1) {
          return `1 ${t("cheats.plan")}`;
        }
        return `${count} ${t("cheats.plans")}`;
      },
    },
    {
      title: t("cheats.status"),
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          AVAILABLE: "green",
          UPDATING: "blue",
          FROZEN: "default",
        };
        const statusMap: Record<string, string> = {
          AVAILABLE: t("cheats.available"),
          UPDATING: t("cheats.updating"),
          FROZEN: t("cheats.frozen"),
        };
        return (
          <Tag color={colorMap[status] || "default"}>
            {statusMap[status] || status}
          </Tag>
        );
      },
    },
    {
      title: t("cheats.sales"),
      dataIndex: "salesCount",
      key: "salesCount",
    },
    {
      title: t("cheats.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: t("cheats.actions"),
      key: "actions",
      width: 100,
      render: (_: unknown, record: Cheat) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => navigate(`/cheats/edit/${record.id}`)}
        >
          {t("cheats.edit")}
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
            <Styled.Title>{t("cheats.title")}</Styled.Title>
            <Styled.Subtitle>{t("cheats.subtitle")}</Styled.Subtitle>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/cheats/create")}
          >
            {t("cheats.createCheat")}
          </Button>
        </Styled.Header>

        <Styled.FiltersCard>
          <Styled.FiltersRow>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
                {t("cheats.filters.searchCheat")}
              </label>
              <Search
                placeholder={t("cheats.filters.searchCheatPlaceholder")}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
                prefix={<SearchOutlined />}
                size="large"
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
                {t("cheats.filters.selectGame")}
              </label>
              <Select
                placeholder={t("cheats.filters.selectGamePlaceholder")}
                value={selectedGameId}
                onChange={setSelectedGameId}
                allowClear
                showSearch
                optionFilterProp="children"
                size="large"
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  String(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
              >
                {games.map((game) => (
                  <Select.Option key={game.id} value={game.id} label={game.name}>
                    {game.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
                {t("cheats.filters.selectBrand")}
              </label>
              <Select
                placeholder={t("cheats.filters.selectBrandPlaceholder")}
                value={selectedBrand}
                onChange={setSelectedBrand}
                allowClear
                showSearch
                optionFilterProp="children"
                size="large"
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  String(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
              >
                {brands.map((brand) => (
                  <Select.Option key={brand} value={brand} label={brand}>
                    {brand}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div>
              <Button
                icon={<ClearOutlined />}
                onClick={handleClearFilters}
                size="large"
                disabled={!searchText && !selectedGameId && !selectedBrand}
              >
                {t("cheats.filters.clearFilters")}
              </Button>
            </div>
          </Styled.FiltersRow>
        </Styled.FiltersCard>

        <Styled.TableCard>
          <Styled.TableWrapper>
            <Table
              dataSource={filteredCheats}
              columns={columns}
              rowKey="id"
              loading={isLoading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} ${t("common.of")} ${total} ${t("common.items")}`,
                responsive: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                showQuickJumper: true,
              }}
              scroll={{ x: "max-content" }}
            />
          </Styled.TableWrapper>
        </Styled.TableCard>

        <EditGameModal
          open={isEditGameModalOpen}
          game={selectedGame}
          onCancel={() => {
            setIsEditGameModalOpen(false);
            setSelectedGame(null);
          }}
        />
      </Styled.Container>
    </motion.div>
  );
}
