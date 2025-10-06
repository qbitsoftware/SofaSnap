"use client"

import { Button } from './ui/button';
import { useTranslation } from '@/lib/i18n/i18n-provider';

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useTranslation();

  const locales = ['et', 'en'] as const;

  return (
    <div className="flex gap-2">
      {locales.map((loc) => (
        <Button
          key={loc}
          onClick={() => setLocale(loc)}
          variant={locale === loc ? "default" : "outline"}
          size="sm"
          className="uppercase"
        >
          {loc}
        </Button>
      ))}
    </div>
  );
};
