import { useState, useMemo } from "react";
import { Button, Table, Input, Popconfirm, Tag, Modal } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ClearOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFaqs, deleteFaq, faqKeys, Faq } from "@/entities/faq";
import { CreateFaqModal } from "@/features/create-faq";
import { EditFaqModal } from "@/features/edit-faq";
import * as Styled from "./styled";

const { Search } = Input;

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function FaqPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [searchText, setSearchText] = useState("");
  const queryClient = useQueryClient();

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: faqKeys.lists(),
    queryFn: getFaqs,
  });

  // Filter faqs based on search text
  const filteredFaqs = useMemo(() => {
    if (!searchText) {
      return faqs;
    }
    const searchLower = searchText.toLowerCase();
    return faqs.filter((faq) =>
      faq.question.toLowerCase().includes(searchLower) ||
      faq.answer.toLowerCase().includes(searchLower)
    );
  }, [faqs, searchText]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: faqKeys.lists() });
      Modal.success({
        title: "FAQ удален",
        content: "FAQ успешно удален.",
      });
    },
    onError: (error: any) => {
      Modal.error({
        title: "Ошибка удаления",
        content: error?.response?.data?.message || "Не удалось удалить FAQ",
      });
    },
  });

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = (faq: Faq) => {
    setEditingFaq(faq);
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = (faqId: string) => {
    deleteMutation.mutate(faqId);
  };

  const handleCreateModalCancel = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditModalCancel = () => {
    setIsEditModalOpen(false);
    setEditingFaq(null);
  };

  const handleClearFilters = () => {
    setSearchText("");
  };

  const columns = [
    {
      title: "Вопрос",
      dataIndex: "question",
      key: "question",
      render: (text: string) => <Styled.NameCell>{text}</Styled.NameCell>,
    },
    {
      title: "Ответ",
      dataIndex: "answer",
      key: "answer",
      render: (answer: string) => (
        <Styled.AnswerCell>
          {answer.length > 100 ? `${answer.substring(0, 100)}...` : answer}
        </Styled.AnswerCell>
      ),
    },
    {
      title: "Статус",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Активен" : "Неактивен"}
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
      render: (_: any, record: Faq) => (
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
            title="Удалить FAQ"
            description={`Вы уверены, что хотите удалить FAQ "${record.question}"?`}
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
          <Styled.Title>Часто задаваемые вопросы (FAQ)</Styled.Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
          >
            Создать FAQ
          </Button>
        </Styled.Header>

        <Styled.Filters>
          <Search
            placeholder="Поиск по вопросу или ответу..."
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
            dataSource={filteredFaqs}
            rowKey="id"
            loading={isLoading}
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `Показаны ${range[0]}-${range[1]} из ${total} FAQ`,
            }}
          />
        </Styled.TableContainer>

        <CreateFaqModal
          open={isCreateModalOpen}
          onCancel={handleCreateModalCancel}
        />

        <EditFaqModal
          faq={editingFaq}
          open={isEditModalOpen}
          onCancel={handleEditModalCancel}
        />
      </Styled.Container>
    </motion.div>
  );
}
