export { getSettings, updateSettings } from "./api";
export type { Settings, UpdateSettingsDto } from "./api";
export { settingsKeys } from "./model/keys";

// Direct export for FooterLink since it's only used in one place
export type { FooterLink } from "./api/settingsApi";

