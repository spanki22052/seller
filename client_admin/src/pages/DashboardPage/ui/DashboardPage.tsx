import { Row, Col, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import {
  ShoppingOutlined,
  PlayCircleOutlined,
  DollarOutlined,
  UserOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { StatsCards, StatCard } from "@/widgets/StatsCards";
import { RecentCheatsTable } from "@/widgets/RecentCheatsTable";
import { RecentGamesTable } from "@/widgets/RecentGamesTable";
import { getCheats, cheatKeys } from "@/entities/cheat";
import { getGames, gameKeys } from "@/entities/game";
import { getDashboardStats, dashboardKeys } from "@/entities/dashboard";
import { STAT_CARD_COLORS } from "@/widgets/StatsCards";
import * as Styled from "./styled";

export function DashboardPage() {
  const { t } = useTranslation();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getDashboardStats,
  });

  const { data: cheats = [], isLoading: cheatsLoading } = useQuery({
    queryKey: cheatKeys.lists(),
    queryFn: getCheats,
  });

  const { data: games = [], isLoading: gamesLoading } = useQuery({
    queryKey: gameKeys.lists(),
    queryFn: getGames,
  });

  const isLoading = statsLoading || cheatsLoading || gamesLoading;

  const statsCards: StatCard[] = stats
    ? [
        {
          title: t("dashboard.totalCheats"),
          value: stats.totalCheats,
          icon: <ShoppingOutlined />,
          color: STAT_CARD_COLORS.PRIMARY,
          trend: { value: 0, isPositive: true },
        },
        {
          title: t("dashboard.totalGames"),
          value: stats.totalGames,
          icon: <PlayCircleOutlined />,
          color: STAT_CARD_COLORS.SUCCESS,
          trend: { value: 0, isPositive: true },
        },
        {
          title: t("dashboard.totalRevenue"),
          value: `$${stats.totalRevenue.toLocaleString()}`,
          icon: <DollarOutlined />,
          color: STAT_CARD_COLORS.SUCCESS,
          trend: { value: 0, isPositive: true },
        },
        {
          title: t("dashboard.totalSales"),
          value: stats.totalSales,
          icon: <TrophyOutlined />,
          color: STAT_CARD_COLORS.PURPLE,
          trend: { value: 0, isPositive: true },
        },
        {
          title: t("dashboard.activeUsers"),
          value: stats.activeUsers,
          icon: <UserOutlined />,
          color: STAT_CARD_COLORS.CYAN,
          trend: { value: 0, isPositive: true },
        },
      ]
    : [];

  const recentCheats = cheats
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5);

  const recentGames = games
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5);

  if (isLoading) {
    return (
      <Styled.Container>
        <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
      </Styled.Container>
    );
  }

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Title>{t("dashboard.title")}</Styled.Title>
        <Styled.Subtitle>{t("dashboard.subtitle")}</Styled.Subtitle>
      </Styled.Header>

      <StatsCards stats={statsCards} />

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <RecentCheatsTable cheats={recentCheats} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <RecentGamesTable games={recentGames} />
        </Col>
      </Row>
    </Styled.Container>
  );
}

