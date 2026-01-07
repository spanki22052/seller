import { useState, useMemo } from "react";
import { Button, Table, Input, Popconfirm, Tag, Modal } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ClearOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getHomeLinks, deleteHomeLink, homeLinkKeys, HomeLink } from "@/entities/home-link";
import { CreateHomeLinkModal } from "@/features/create-home-link";
import { EditHomeLinkModal } from "@/features/edit-home-link";
import * as Styled from "./styled";

const { Search } = Input;

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function HomePage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingHomeLink, setEditingHomeLink] = useState<HomeLink | null>(null);
  const [searchText, setSearchText] = useState("");
  const queryClient = useQueryClient();

  const { data: homeLinks = [], isLoading } = useQuery({
    queryKey: homeLinkKeys.lists(),
    queryFn: getHomeLinks,
  });

  // Filter home links based on search text
  const filteredHomeLinks = useMemo(() => {
    if (!searchText) {
      return homeLinks;
    }
    const searchLower = searchText.toLowerCase();
    return homeLinks.filter((homeLink) =>
      homeLink.title.toLowerCase().includes(searchLower) ||
      homeLink.url.toLowerCase().includes(searchLower) ||
      (homeLink.description && homeLink.description.toLowerCase().includes(searchLower))
    );
  }, [homeLinks, searchText]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteHomeLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: homeLinkKeys.lists() });
      Modal.success({
        title: "Ссылка удалена",
        content: "Ссылка главной страницы успешно удалена.",
      });
    },
    onError: (error: any) => {
      Modal.error({
        title: "Ошибка удаления",
        content: error?.response?.data?.message || "Не удалось удалить ссылку",
      });
    },
  });

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = (homeLink: HomeLink) => {
    setEditingHomeLink(homeLink);
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = (homeLinkId: string) => {
    deleteMutation.mutate(homeLinkId);
  };

  const handleCreateModalCancel = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditModalCancel = () => {
    setIsEditModalOpen(false);
    setEditingHomeLink(null);
  };

  const handleClearFilters = () => {
    setSearchText("");
  };

  const columns = [
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <Styled.NameCell>{text}</Styled.NameCell>,
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (url: string) => (
        <Styled.UrlCell>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </Styled.UrlCell>
      ),
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
      render: (description: string | null) => (
        <Styled.DescriptionCell>
          {description || "-"}
        </Styled.DescriptionCell>
      ),
    },
    {
      title: "Статус",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Активна" : "Неактивна"}
        </Tag>
      ),
    },
    {
      title: "Порядок",
      dataIndex: "sortOrder",
      key: "sortOrder",
      render: (sortOrder: number) => <span>{sortOrder}</span>,
    },
    {
      title: "Дата создания",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: HomeLink) => (
        <Styled.ActionsCell>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            Редактировать
          </Button>
          <Popconfirm
            title="Удалить ссылку"
            description={`Вы уверены, что хотите удалить ссылку "${record.title}"?`}
            onConfirm={() => handleDeleteConfirm(record.id)}
            okText="Да"
            cancelText="Нет"
            okType="danger"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              size="small"
              loading={deleteMutation.isPending}
            >
              Удалить
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
          <Styled.Title>Главная страница</Styled.Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
          >
            Создать ссылку
          </Button>
        </Styled.Header>

        <Styled.Filters>
          <Search
            placeholder="Поиск по названию, URL или описанию..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={setSearchText}
            style={{ width: 400 }}
            allowClear
          />
          {searchText && (
            <Button
              icon={<ClearOutlined />}
              onClick={handleClearFilters}
            >
              Очистить фильтры
            </Button>
          )}
        </Styled.Filters>

        <Styled.TableContainer>
          <Table
            columns={columns}
            dataSource={filteredHomeLinks}
            rowKey="id"
            loading={isLoading}
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Показаны ${range[0]}-${range[1]} из ${total} ссылок`,
            }}
          />
        </Styled.TableContainer>

        <CreateHomeLinkModal
          open={isCreateModalOpen}
          onCancel={handleCreateModalCancel}
        />

        <EditHomeLinkModal
          homeLink={editingHomeLink}
          open={isEditModalOpen}
          onCancel={handleEditModalCancel}
        />
      </Styled.Container>
    </motion.div>
  );
}
