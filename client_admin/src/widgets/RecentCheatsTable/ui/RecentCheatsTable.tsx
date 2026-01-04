import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { Cheat } from "@/entities/cheat";
import * as Styled from "./styled";
import { TABLE_PAGE_SIZE } from "../model/constants";

interface RecentCheatsTableProps {
  cheats: Cheat[];
}

export function RecentCheatsTable({ cheats }: RecentCheatsTableProps) {
  const { t } = useTranslation();
  
  const columns: ColumnsType<Cheat> = [
    {
      title: t("cheats.name"),
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Styled.NameCell>{text}</Styled.NameCell>,
    },
    {
      title: t("cheats.game"),
      dataIndex: "gameName",
      key: "gameName",
    },
    {
      title: t("cheats.price"),
      dataIndex: "price",
      key: "price",
      render: (price: number | { amount: number | null; currency: string }) => {
        if (typeof price === "object" && price !== null) {
          const amount = price.amount ?? 0;
          const currency = price.currency || "USD";
          return `${currency === "RUB" ? "₽" : "$"}${amount.toFixed(2)}`;
        }
        return `$${(price || 0).toFixed(2)}`;
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
        return <Tag color={colorMap[status]}>{statusMap[status] || status.toUpperCase()}</Tag>;
      },
    },
    {
      title: t("cheats.sales"),
      dataIndex: "salesCount",
      key: "salesCount",
      render: (count?: number) => <Styled.SalesCell>{count ?? 0}</Styled.SalesCell>,
    },
    {
      title: t("cheats.rating"),
      dataIndex: "rating",
      key: "rating",
      render: (rating?: number) => (
        <Styled.RatingCell>{(rating ?? 0).toFixed(1)} ⭐</Styled.RatingCell>
      ),
    },
  ];

  return (
    <Styled.StyledCard title={t("cheats.recent")} extra={<Styled.Link>{t("cheats.viewAll")}</Styled.Link>}>
      <Table
        columns={columns}
        dataSource={cheats}
        rowKey="id"
        pagination={{ pageSize: TABLE_PAGE_SIZE, hideOnSinglePage: true }}
        size="middle"
      />
    </Styled.StyledCard>
  );
}

