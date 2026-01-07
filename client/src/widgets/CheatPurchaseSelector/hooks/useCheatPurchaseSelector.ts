import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCheat, cheatKeys } from "@/entities/cheat";
import { PricingPlan } from "@/entities/cheat/model/types";

export function useCheatPurchaseSelector(cheatId: string) {
  const { data: cheat, isLoading } = useQuery({
    queryKey: cheatKeys.detail(cheatId),
    queryFn: () => getCheat(cheatId),
  });

  // Find the cheapest available plan
  const defaultPlan = useMemo(() => {
    if (!cheat?.pricingPlans?.length) return null;

    return cheat.pricingPlans
      .filter(plan => plan.isAvailable && plan.price > 0)
      .sort((a, b) => a.price - b.price)[0] || null;
  }, [cheat?.pricingPlans]);

  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(defaultPlan);

  // Update selected plan when default plan changes
  useMemo(() => {
    setSelectedPlan(defaultPlan);
  }, [defaultPlan]);

  const handlePurchase = () => {
    if (selectedPlan?.redirectUrl) {
      window.open(selectedPlan.redirectUrl, "_blank");
    }
  };

  const availablePlans = useMemo(() => {
    return cheat?.pricingPlans?.filter(plan => plan.isAvailable) || [];
  }, [cheat?.pricingPlans]);

  return {
    cheat,
    isLoading,
    selectedPlan,
    setSelectedPlan,
    handlePurchase,
    availablePlans,
    hasAvailablePlans: availablePlans.length > 0,
  };
}
