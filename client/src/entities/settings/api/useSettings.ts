import { useQuery } from "@tanstack/react-query";
import { getSettings } from "./settingsApi";
import { settingsKeys } from "../model/keys";

export function useSettings() {
  return useQuery({
    queryKey: settingsKeys.detail(),
    queryFn: getSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
