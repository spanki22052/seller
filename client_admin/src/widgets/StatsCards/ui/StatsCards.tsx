import { Card, Row, Col, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import * as Styled from "./styled";
import { StatCard } from "../model/types";

interface StatsCardsProps {
  stats: StatCard[];
}

export function StatsCards({ stats }: StatsCardsProps) {
  const { t } = useTranslation();
  
  return (
    <Styled.Container>
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={
                  stat.trend ? (
                    stat.trend.isPositive ? (
                      <ArrowUpOutlined style={{ color: "#52c41a" }} />
                    ) : (
                      <ArrowDownOutlined style={{ color: "#ff4d4f" }} />
                    )
                  ) : (
                    stat.icon
                  )
                }
                suffix={stat.suffix || stat.prefix}
                valueStyle={{ color: stat.color }}
              />
              {stat.trend && (
                <Styled.Trend>
                  {stat.trend.isPositive ? "+" : ""}
                  {stat.trend.value}% {t("dashboard.fromLastMonth")}
                </Styled.Trend>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Styled.Container>
  );
}

