export const locales = ['et', 'en'] as const;
export const defaultLocale = 'et' as const;

export type Locale = (typeof locales)[number];
