import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { Game } from "@/entities/game";
import * as Styled from "./styled";
import { TABLE_PAGE_SIZE } from "../model/constants";

interface RecentGamesTableProps {
  games: Game[];
}

export function RecentGamesTable({ games }: RecentGamesTableProps) {
  const { t } = useTranslation();
  
  const columns: ColumnsType<Game> = [
    {
      title: t("games.name"),
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Styled.NameCell>{text}</Styled.NameCell>,
    },
    {
      title: t("games.color"),
      dataIndex: "color",
      key: "color",
      render: (color: string) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: color,
              borderRadius: 4,
              border: "1px solid #d9d9d9",
            }}
          />
          <span>{color}</span>
        </div>
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
  ];

  return (
    <Styled.StyledCard title={t("games.overview")} extra={<Styled.Link>{t("games.viewAll")}</Styled.Link>}>
      <Table
        columns={columns}
        dataSource={games}
        rowKey="id"
        pagination={{ pageSize: TABLE_PAGE_SIZE, hideOnSinglePage: true }}
        size="middle"
      />
    </Styled.StyledCard>
  );
}

