import { useState, useMemo } from "react";
import { Button, Table, Tag, Input, Select, Modal, Checkbox } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  SearchOutlined,
  ClearOutlined,
  CopyOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCheats, cheatKeys, Cheat } from "@/entities/cheat";
import { getGames, gameKeys, Game } from "@/entities/game";
import { getBrands, brandKeys } from "@/entities/brand";
import { EditGameModal } from "@/features/edit-game";
import { useDuplicateCheat } from "@/features/duplicate-cheat";
import { useDeleteCheat } from "@/features/delete-cheat";
import { ChangeCheatStatusModal } from "@/features/change-cheat-status";
import { BulkChangeCheatStatusModal } from "@/features/bulk-change-cheat-status";
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cheatToDelete, setCheatToDelete] = useState<Cheat | null>(null);
  const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false);
  const [cheatToChangeStatus, setCheatToChangeStatus] = useState<Cheat | null>(null);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedCheatIds, setSelectedCheatIds] = useState<string[]>([]);
  const [isBulkChangeModalOpen, setIsBulkChangeModalOpen] = useState(false);

  const duplicateCheatMutation = useDuplicateCheat();
  const deleteCheatMutation = useDeleteCheat();

  // Filter states
  const [searchText, setSearchText] = useState("");
  const [selectedGameId, setSelectedGameId] = useState<string | undefined>(
    undefined
  );
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
    undefined
  );

  const { data: cheats = [], isLoading } = useQuery({
    queryKey: cheatKeys.lists(),
    queryFn: getCheats,
  });

  const { data: games = [] } = useQuery({
    queryKey: gameKeys.lists(),
    queryFn: getGames,
  });

  const { data: brands = [] } = useQuery({
    queryKey: brandKeys.lists(),
    queryFn: getBrands,
  });

  // Filter cheats based on filters
  const filteredCheats = useMemo(() => {
    return cheats.filter((cheat) => {
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
  }, [cheats, selectedGameId, selectedBrand]);

  const handleClearFilters = () => {
    setSearchText("");
    setSelectedGameId(undefined);
    setSelectedBrand(undefined);
  };

  const handleDeleteCheat = (cheat: Cheat) => {
    setCheatToDelete(cheat);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (cheatToDelete) {
      deleteCheatMutation.mutate(cheatToDelete.id);
      setIsDeleteModalOpen(false);
      setCheatToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCheatToDelete(null);
  };

  const handleBrandClick = (cheat: Cheat) => {
    setCheatToChangeStatus(cheat);
    setIsChangeStatusModalOpen(true);
  };

  const handleCancelChangeStatus = () => {
    setIsChangeStatusModalOpen(false);
    setCheatToChangeStatus(null);
  };

  const handleToggleBulkMode = () => {
    setIsBulkMode(!isBulkMode);
    setSelectedCheatIds([]);
  };

  const handleSelectCheat = (cheatId: string, checked: boolean) => {
    if (checked) {
      setSelectedCheatIds(prev => [...prev, cheatId]);
    } else {
      setSelectedCheatIds(prev => prev.filter(id => id !== cheatId));
    }
  };

  const handleSelectAllCheats = (checked: boolean) => {
    if (checked) {
      setSelectedCheatIds(filteredCheats.map(cheat => cheat.id));
    } else {
      setSelectedCheatIds([]);
    }
  };

  const handleBulkChangeStatus = () => {
    setIsBulkChangeModalOpen(true);
  };

  const handleCancelBulkChange = () => {
    setIsBulkChangeModalOpen(false);
  };

  const columns = [
    ...(isBulkMode
      ? [
          {
            title: (
              <Checkbox
                checked={selectedCheatIds.length === filteredCheats.length && filteredCheats.length > 0}
                indeterminate={selectedCheatIds.length > 0 && selectedCheatIds.length < filteredCheats.length}
                onChange={(e) => handleSelectAllCheats(e.target.checked)}
              />
            ),
            key: "select",
            width: 50,
            render: (_: unknown, record: Cheat) => (
              <Checkbox
                checked={selectedCheatIds.includes(record.id)}
                onChange={(e) => handleSelectCheat(record.id, e.target.checked)}
              />
            ),
          },
        ]
      : []),
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
      title: t("cheats.brand"),
      dataIndex: "brandName",
      key: "brandName",
      render: (brandName: string, record: Cheat) => {
        return (
          <Styled.ClickableName onClick={() => handleBrandClick(record)}>
            {brandName}
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
          DRAFT: "orange",
        };
        const statusMap: Record<string, string> = {
          AVAILABLE: t("cheats.available"),
          UPDATING: t("cheats.updating"),
          FROZEN: t("cheats.frozen"),
          DRAFT: t("cheats.draft"),
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
      width: 150,
      render: (_: unknown, record: Cheat) => (
        <div style={{ display: "flex", gap: "4px" }}>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/cheats/edit/${record.id}`)}
            title={t("cheats.edit")}
          />
          <Button
            type="link"
            icon={<CopyOutlined />}
            onClick={() => duplicateCheatMutation.mutate(record.id)}
            loading={duplicateCheatMutation.isPending}
            title={t("cheats.duplicate")}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteCheat(record)}
            title={t("cheats.delete")}
          />
        </div>
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
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              onClick={handleToggleBulkMode}
              type={isBulkMode ? "primary" : "default"}
            >
              {isBulkMode ? t("cheats.bulkMode.exit") : t("cheats.bulkMode.enter")}
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/cheats/create")}
            >
              {t("cheats.createCheat")}
            </Button>
          </div>
        </Styled.Header>

        <Styled.FiltersCard>
          {isBulkMode && selectedCheatIds.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                onClick={handleBulkChangeStatus}
                icon={<EditOutlined />}
              >
                {t("cheats.bulkMode.changeStatus")} ({selectedCheatIds.length})
              </Button>
            </div>
          )}
          <Styled.FiltersRow>
            <div>
              <label
                style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
              >
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
              <label
                style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
              >
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
                  String(option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {games.map((game) => (
                  <Select.Option
                    key={game.id}
                    value={game.id}
                    label={game.name}
                  >
                    {game.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div>
              <label
                style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
              >
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
                  String(option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {brands.map((brand) => (
                  <Select.Option
                    key={brand.id}
                    value={brand.name}
                    label={brand.name}
                  >
                    {brand.name}
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

        <EditGameModal
          open={isEditGameModalOpen}
          game={selectedGame}
          onCancel={() => {
            setIsEditGameModalOpen(false);
            setSelectedGame(null);
          }}
        />

        <Modal
          title={t("cheats.confirmDelete")}
          open={isDeleteModalOpen}
          onOk={handleConfirmDelete}
          onCancel={handleCancelDelete}
          confirmLoading={deleteCheatMutation.isPending}
          okText={t("common.delete")}
          cancelText={t("common.cancel")}
          okButtonProps={{ danger: true }}
        >
          <p>
            {t("cheats.confirmDeleteDescription", {
              name: cheatToDelete?.name || "",
            })}
          </p>
        </Modal>

        <ChangeCheatStatusModal
          open={isChangeStatusModalOpen}
          cheat={cheatToChangeStatus}
          onCancel={handleCancelChangeStatus}
        />

        <BulkChangeCheatStatusModal
          open={isBulkChangeModalOpen}
          cheatIds={selectedCheatIds}
          onCancel={handleCancelBulkChange}
        />
      </Styled.Container>
    </motion.div>
  );
}
