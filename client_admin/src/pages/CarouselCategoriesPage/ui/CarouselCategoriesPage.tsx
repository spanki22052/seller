import { useState, useMemo } from "react";
import { Button, Table, Input, Modal, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ClearOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCarouselCategories, deleteCarouselCategory, carouselCategoryKeys, CarouselCategory } from "@/entities/carousel-category";
import { CreateCarouselCategoryModal } from "@/features/create-carousel-category";
import { EditCarouselCategoryModal } from "@/features/create-carousel-category/ui/EditCarouselCategoryModal";
import * as Styled from "./styled";

const { Search } = Input;

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function CarouselCategoriesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CarouselCategory | null>(null);
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: carouselCategories = [], isLoading } = useQuery({
    queryKey: carouselCategoryKeys.lists(),
    queryFn: getCarouselCategories,
  });

  // Filter categories based on search text
  const filteredCategories = useMemo(() => {
    if (!searchText) {
      return carouselCategories;
    }
    const searchLower = searchText.toLowerCase();
    return carouselCategories.filter((category) =>
      category.name.toLowerCase().includes(searchLower)
    );
  }, [carouselCategories, searchText]);


  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCarouselCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carouselCategoryKeys.lists() });
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      Modal.error({
        title: t("carouselCategories.notifications.deleteFailed") || "Failed to delete carousel category",
        content: error?.response?.data?.message || error.message,
      });
    },
  });

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = (category: CarouselCategory) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = (categoryId: string) => {
    deleteMutation.mutate(categoryId);
  };

  const handleCreateModalCancel = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditModalCancel = () => {
    setIsEditModalOpen(false);
    setEditingCategory(null);
  };

  const handleClearFilters = () => {
    setSearchText("");
  };

  const columns = [
    {
      title: t("carouselCategories.name") || "Category Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Styled.NameCell>{text}</Styled.NameCell>,
    },
    {
      title: t("carouselCategories.createdAt") || "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: t("carouselCategories.updatedAt") || "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: t("common.actions") || "Actions",
      key: "actions",
      render: (_: unknown, record: CarouselCategory) => (
        <Styled.ActionsCell>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            {t("common.edit") || "Edit"}
          </Button>
          <Popconfirm
            title={t("carouselCategories.confirmDelete") || "Delete Carousel Category"}
            description={t("carouselCategories.confirmDeleteMessage", { name: record.name }) || `Are you sure you want to delete "${record.name}"?`}
            onConfirm={() => handleDeleteConfirm(record.id)}
            okText={t("common.yes") || "Yes"}
            cancelText={t("common.no") || "No"}
            okType="danger"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              size="small"
              loading={deleteMutation.isPending}
            >
              {t("common.delete") || "Delete"}
            </Button>
          </Popconfirm>
        </Styled.ActionsCell>
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
          <Styled.Title>{t("carouselCategories.title") || "Carousel Categories"}</Styled.Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
          >
            {t("carouselCategories.createCategory") || "Create Category"}
          </Button>
        </Styled.Header>

        <Styled.Filters>
          <Search
            placeholder={t("carouselCategories.searchPlaceholder") || "Search by category name..."}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={setSearchText}
            style={{ width: 300 }}
            allowClear
          />
          {searchText && (
            <Button
              icon={<ClearOutlined />}
              onClick={handleClearFilters}
            >
              {t("common.clearFilters") || "Clear Filters"}
            </Button>
          )}
        </Styled.Filters>

        <Styled.TableContainer>
          <Table
            columns={columns}
            dataSource={filteredCategories}
            rowKey="id"
            loading={isLoading}
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                t("common.showing", { from: range[0], to: range[1], total }) ||
                `Showing ${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Styled.TableContainer>

        <CreateCarouselCategoryModal
          open={isCreateModalOpen}
          onCancel={handleCreateModalCancel}
        />

        <EditCarouselCategoryModal
          category={editingCategory}
          open={isEditModalOpen}
          onCancel={handleEditModalCancel}
        />
      </Styled.Container>
    </motion.div>
  );
}
