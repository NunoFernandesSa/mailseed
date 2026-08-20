import {
  APP_DATA,
  AppLocale,
  AppTranslations,
  SUPPORTED_LOCALES,
} from "@/constants/app-data.constants";
import { useCallback, useMemo } from "react";

/**
 * Default locale used when:
 * - no user preference is stored yet
 * - system locale is not in SUPPORTED_LOCALES
 */
export const FALLBACK_LOCALE: AppLocale = "fr";

/**
 * Picks the best matching AppLocale from any BCP-47 language tag
 * (e.g. "pt-BR" → "pt-PT", "fr-FR" → "fr", "es-ES" → FALLBACK_LOCALE).
 * Kept lightweight — no expo-localization dependency required.
 */
export const pickBestLocale = (bcp47: string): AppLocale => {
  const tag = bcp47.toLowerCase();
  if (tag.startsWith("pt")) return "pt-PT";
  if (tag.startsWith("fr")) return "fr";
  if (tag.startsWith("en")) return "en";
  return FALLBACK_LOCALE;
};

/**
 * Access static UI texts + fixed params for the currently active locale.
 *
 * Usage:
 * ```tsx
 * const { t } = useAppData();
 * return <Text>{t.emptyState.title}</Text>;
 * ```
 *
 * ── Later, when you add a settings store: ─────────────────────
 *   1. Read the saved `locale` from your zustand store
 *   2. Use it instead of the hardcoded `FALLBACK_LOCALE` below
 */
export const useAppData = () => {
  // TODO: replace hardcoded fallback with store value, e.g.
  //   const { locale } = useSettingsStore();
  //   const activeLocale: AppLocale =
  //     (SUPPORTED_LOCALES as readonly string[]).includes(locale)
  //       ? (locale as AppLocale)
  //       : FALLBACK_LOCALE;
  const activeLocale: AppLocale = FALLBACK_LOCALE;

  const t: AppTranslations = useMemo(
    () => APP_DATA[activeLocale],
    [activeLocale],
  );

  const setLocaleSafe = useCallback((next: string): AppLocale => {
    return (SUPPORTED_LOCALES as readonly string[]).includes(next)
      ? (next as AppLocale)
      : FALLBACK_LOCALE;
  }, []);

  return {
    /** Current resolved locale */
    locale: activeLocale,
    /** All static texts + params for the active locale */
    t,
    /** Full list of supported locale codes */
    supportedLocales: SUPPORTED_LOCALES,
    /** Type-safe setter you can bind to a settings store action later */
    setLocaleSafe,
  } as const;
};
