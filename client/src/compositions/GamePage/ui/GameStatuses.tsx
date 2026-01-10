"use client";

import { useMemo } from "react";
import { CheckCircleOutlined, SyncOutlined, StopOutlined } from "@ant-design/icons";
import { CheatStatus } from "@/entities/cheat";
import { Cheat } from "@/entities/game";
import * as Styled from "./styled";

interface GameStatusesProps {
  cheats: Cheat[];
}

const statusConfig = {
  AVAILABLE: {
    label: "Доступно",
    icon: CheckCircleOutlined,
    color: "#10b981",
    bgColor: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)",
    borderColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.3)",
  },
  UPDATING: {
    label: "Обновляется",
    icon: SyncOutlined,
    color: "#3b82f6",
    bgColor: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(255, 0, 255, 0.05) 100%)",
    borderColor: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.3)",
  },
  FROZEN: {
    label: "Заморожено",
    icon: StopOutlined,
    color: "#6b7280",
    bgColor: "linear-gradient(135deg, rgba(107, 114, 128, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)",
    borderColor: "#6b7280",
    glowColor: "rgba(107, 114, 128, 0.3)",
  },
} as const;

export function GameStatuses({ cheats }: GameStatusesProps) {
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      AVAILABLE: 0,
      UPDATING: 0,
      FROZEN: 0,
    };

    cheats.forEach((cheat) => {
      if (counts[cheat.status] !== undefined) {
        counts[cheat.status]++;
      }
    });

    return counts;
  }, [cheats]);

  const totalCheats = cheats.length;
  const activeStatuses = Object.entries(statusCounts).filter(([, count]) => count > 0);

  if (totalCheats === 0) {
    return null;
  }

  return (
    <Styled.StatusesWrapper>
      {activeStatuses.map(([status, count]) => {
        const config = statusConfig[status as CheatStatus];
        const IconComponent = config.icon;

        return (
          <Styled.StatusCard
            key={status}
            $bgColor={config.bgColor}
            $borderColor={config.borderColor}
            $glowColor={config.glowColor}
          >
            <Styled.StatusIcon $color={config.color}>
              <IconComponent />
            </Styled.StatusIcon>
            <Styled.StatusContent>
              <Styled.StatusCount $color={config.color}>
                {count}
              </Styled.StatusCount>
              <Styled.StatusLabel>
                {config.label}
              </Styled.StatusLabel>
            </Styled.StatusContent>
          </Styled.StatusCard>
        );
      })}
    </Styled.StatusesWrapper>
  );
}
