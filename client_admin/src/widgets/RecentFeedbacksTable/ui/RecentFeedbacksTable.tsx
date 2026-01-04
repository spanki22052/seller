import { Table, Tag, Rate } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { Feedback } from "@/entities/feedback";
import * as Styled from "./styled";
import { TABLE_PAGE_SIZE } from "../model/constants";

interface RecentFeedbacksTableProps {
  feedbacks: Feedback[];
}

export function RecentFeedbacksTable({
  feedbacks,
}: RecentFeedbacksTableProps) {
  const { t } = useTranslation();
  
  const columns: ColumnsType<Feedback> = [
    {
      title: t("feedbacks.user"),
      dataIndex: "userName",
      key: "userName",
      render: (text: string) => <Styled.NameCell>{text}</Styled.NameCell>,
    },
    {
      title: t("feedbacks.cheat"),
      dataIndex: "cheatName",
      key: "cheatName",
    },
    {
      title: t("feedbacks.rating"),
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled value={rating} count={5} />,
    },
    {
      title: t("feedbacks.comment"),
      dataIndex: "comment",
      key: "comment",
      render: (text: string) => (
        <Styled.CommentCell>{text.substring(0, 50)}...</Styled.CommentCell>
      ),
    },
    {
      title: t("feedbacks.status"),
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          approved: "green",
          pending: "orange",
          rejected: "red",
        };
        const statusMap: Record<string, string> = {
          approved: t("feedbacks.approved"),
          pending: t("feedbacks.pending"),
          rejected: t("feedbacks.rejected"),
        };
        return <Tag color={colorMap[status]}>{statusMap[status] || status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <Styled.StyledCard title={t("feedbacks.recent")} extra={<Styled.Link>{t("feedbacks.viewAll")}</Styled.Link>}>
      <Table
        columns={columns}
        dataSource={feedbacks}
        rowKey="id"
        pagination={{ pageSize: TABLE_PAGE_SIZE, hideOnSinglePage: true }}
        size="middle"
      />
    </Styled.StyledCard>
  );
}

