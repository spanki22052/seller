export { getSettings, updateSettings } from "./api";
export type { Settings, UpdateSettingsDto } from "./api";
export { settingsKeys } from "./model/keys";

// Direct export for types since they're used in multiple places
export type { FooterLink, SupportLink, CarouselCategoryGames } from "./api/settingsApi";

