import { useState, useMemo } from "react";
import { Button, Table, Input, Modal, Form, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ClearOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBrands, createBrand, updateBrand, deleteBrand, brandKeys, Brand, CreateBrandDto, UpdateBrandDto } from "@/entities/brand";
import * as Styled from "./styled";

const { Search } = Input;

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function BrandsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: brands = [], isLoading } = useQuery({
    queryKey: brandKeys.lists(),
    queryFn: getBrands,
  });

  // Filter brands based on search text
  const filteredBrands = useMemo(() => {
    if (!searchText) {
      return brands;
    }
    const searchLower = searchText.toLowerCase();
    return brands.filter((brand) =>
      brand.name.toLowerCase().includes(searchLower)
    );
  }, [brands, searchText]);

  const createMutation = useMutation({
    mutationFn: (dto: CreateBrandDto) => createBrand(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.lists() });
      message.success(t("brands.notifications.created") || "Brand created successfully");
      setIsModalOpen(false);
      form.resetFields();
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || t("brands.notifications.createFailed") || "Failed to create brand");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateBrandDto }) => updateBrand(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.lists() });
      message.success(t("brands.notifications.updated") || "Brand updated successfully");
      setEditingBrand(null);
      form.resetFields();
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || t("brands.notifications.updateFailed") || "Failed to update brand");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.lists() });
      message.success(t("brands.notifications.deleted") || "Brand deleted successfully");
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || t("brands.notifications.deleteFailed") || "Failed to delete brand");
    },
  });

  const handleCreate = () => {
    setEditingBrand(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    form.setFieldsValue({ name: brand.name });
    setIsModalOpen(true);
  };

  const handleDelete = (brand: Brand) => {
    Modal.confirm({
      title: t("brands.confirmDelete") || "Delete Brand",
      content: t("brands.confirmDeleteMessage", { name: brand.name }) || `Are you sure you want to delete "${brand.name}"?`,
      okText: t("common.yes") || "Yes",
      cancelText: t("common.no") || "No",
      onOk: () => deleteMutation.mutate(brand.id),
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingBrand) {
        updateMutation.mutate({ id: editingBrand.id, dto: values });
      } else {
        createMutation.mutate(values);
      }
    });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditingBrand(null);
    form.resetFields();
  };

  const handleClearFilters = () => {
    setSearchText("");
  };

  const columns = [
    {
      title: t("brands.name") || "Brand Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Styled.NameCell>{text}</Styled.NameCell>,
    },
    {
      title: t("brands.createdAt") || "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: t("brands.updatedAt") || "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: t("common.actions") || "Actions",
      key: "actions",
      render: (_: any, record: Brand) => (
        <Styled.ActionsCell>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            {t("common.edit") || "Edit"}
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            size="small"
            loading={deleteMutation.isPending}
          >
            {t("common.delete") || "Delete"}
          </Button>
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
          <Styled.Title>{t("brands.title") || "Brands"}</Styled.Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
          >
            {t("brands.createBrand") || "Create Brand"}
          </Button>
        </Styled.Header>

        <Styled.Filters>
          <Search
            placeholder={t("brands.searchPlaceholder") || "Search by brand name..."}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={setSearchText}
            style={{ width: 300 }}
            allowClear
          />
          {(searchText) && (
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
            dataSource={filteredBrands}
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

        <Modal
          title={editingBrand ? (t("brands.editBrand") || "Edit Brand") : (t("brands.createBrand") || "Create Brand")}
          open={isModalOpen}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          confirmLoading={createMutation.isPending || updateMutation.isPending}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label={t("brands.name") || "Brand Name"}
              rules={[
                { required: true, message: t("brands.nameRequired") || "Please enter brand name" },
                { min: 2, message: t("brands.nameMinLength") || "Brand name must be at least 2 characters" },
              ]}
            >
              <Input placeholder={t("brands.namePlaceholder") || "Enter brand name"} />
            </Form.Item>
          </Form>
        </Modal>
      </Styled.Container>
    </motion.div>
  );
}
