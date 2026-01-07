import { useState, useMemo } from "react";
import { Button, Table, Input, Modal, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ClearOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories, deleteCategory, categoryKeys, Category } from "@/entities/category";
import { CreateCategoryModal } from "@/features/create-category";
import { EditCategoryModal } from "@/features/create-category/ui/EditCategoryModal";
import * as Styled from "./styled";

const { Search } = Input;

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function CategoriesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: getCategories,
  });

  // Filter categories based on search text
  const filteredCategories = useMemo(() => {
    if (!searchText) {
      return categories;
    }
    const searchLower = searchText.toLowerCase();
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchLower)
    );
  }, [categories, searchText]);


  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
    onError: (error: any) => {
      Modal.error({
        title: t("categories.notifications.deleteFailed") || "Failed to delete category",
        content: error?.response?.data?.message || error.message,
      });
    },
  });

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = (category: Category) => {
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
      title: t("categories.name") || "Category Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Styled.NameCell>{text}</Styled.NameCell>,
    },
    {
      title: t("categories.createdAt") || "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: t("categories.updatedAt") || "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: t("common.actions") || "Actions",
      key: "actions",
      render: (_: any, record: Category) => (
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
            title={t("categories.confirmDelete") || "Delete Category"}
            description={t("categories.confirmDeleteMessage", { name: record.name }) || `Are you sure you want to delete "${record.name}"?`}
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
          <Styled.Title>{t("categories.title") || "Categories"}</Styled.Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
          >
            {t("categories.createCategory") || "Create Category"}
          </Button>
        </Styled.Header>

        <Styled.Filters>
          <Search
            placeholder={t("categories.searchPlaceholder") || "Search by category name..."}
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

        <CreateCategoryModal
          open={isCreateModalOpen}
          onCancel={handleCreateModalCancel}
        />

        <EditCategoryModal
          category={editingCategory}
          open={isEditModalOpen}
          onCancel={handleEditModalCancel}
        />
      </Styled.Container>
    </motion.div>
  );
}
