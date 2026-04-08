import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

/** Locale pills from i18n supported languages; avoids loading every namespace. */
export function useLocaleMenu() {
  const { i18n } = useTranslation();

  return useMemo(() => {
    const raw = i18n.options.supportedLngs;
    const codes = Array.isArray(raw)
      ? raw.filter((c) => typeof c === 'string')
      : ['en'];

    const uiLang = (i18n.resolvedLanguage || 'en').split(/[-_]/)[0];
    let displayNames;
    try {
      displayNames = new Intl.DisplayNames([uiLang], { type: 'language' });
    } catch {
      displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
    }

    return codes.map((code) => ({
      code,
      label: displayNames.of(code) || code,
    }));
  }, [i18n.options.supportedLngs, i18n.resolvedLanguage]);
}
