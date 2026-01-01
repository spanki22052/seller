export interface Feature {
  icon: string;
  key: "fast" | "honest" | "satisfied" | "responsive";
  descKey: "fastDesc" | "honestDesc" | "satisfiedDesc" | "responsiveDesc";
}

export const features: Feature[] = [
  { icon: "bolt", key: "fast", descKey: "fastDesc" },
  { icon: "verified_user", key: "honest", descKey: "honestDesc" },
  { icon: "sentiment_satisfied_alt", key: "satisfied", descKey: "satisfiedDesc" },
  { icon: "support_agent", key: "responsive", descKey: "responsiveDesc" },
];

