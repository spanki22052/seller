export interface StatCard {
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  color: string;
}

