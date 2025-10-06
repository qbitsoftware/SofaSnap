"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import etCommon from '@/translations/et/common.json';
import etLanding from '@/translations/et/landing.json';
import etCategories from '@/translations/et/categories.json';
import etProducts from '@/translations/et/products.json';
import etReviews from '@/translations/et/reviews.json';
import etHowItWorks from '@/translations/et/how-it-works.json';
import etAuth from '@/translations/et/auth.json';
import etFaq from '@/translations/et/faq.json';
import etContact from '@/translations/et/contact.json';
import etAbout from '@/translations/et/about.json';
import etMap from '@/translations/et/map.json';
import etListings from '@/translations/et/listings.json';
import etFavorites from '@/translations/et/favorites.json';
import etAddProduct from '@/translations/et/add-product.json';
import etTerms from '@/translations/et/terms.json';
import etNavbar from '@/translations/et/navbar.json';
import etFooter from '@/translations/et/footer.json';
import etResponsibleRenter from '@/translations/et/responsible-renter.json';
import etPrivacyPolicy from '@/translations/et/privacy-policy.json';
import etCancellationPolicy from '@/translations/et/cancellation-policy.json';
import etReportUser from '@/translations/et/report-user.json';

import enCommon from '@/translations/en/common.json';
import enLanding from '@/translations/en/landing.json';
import enCategories from '@/translations/en/categories.json';
import enProducts from '@/translations/en/products.json';
import enReviews from '@/translations/en/reviews.json';
import enHowItWorks from '@/translations/en/how-it-works.json';
import enAuth from '@/translations/en/auth.json';
import enFaq from '@/translations/en/faq.json';
import enContact from '@/translations/en/contact.json';
import enAbout from '@/translations/en/about.json';
import enMap from '@/translations/en/map.json';
import enListings from '@/translations/en/listings.json';
import enFavorites from '@/translations/en/favorites.json';
import enAddProduct from '@/translations/en/add-product.json';
import enTerms from '@/translations/en/terms.json';
import enNavbar from '@/translations/en/navbar.json';
import enFooter from '@/translations/en/footer.json';
import enResponsibleRenter from '@/translations/en/responsible-renter.json';
import enPrivacyPolicy from '@/translations/en/privacy-policy.json';
import enCancellationPolicy from '@/translations/en/cancellation-policy.json';
import enReportUser from '@/translations/en/report-user.json';

type Locale = 'et' | 'en';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const mergeTranslations = (...sources: any[]) => {
  return sources.reduce((acc, source) => {
    return { ...acc, ...source };
  }, {});
};

const translations: Record<Locale, any> = {
  et: mergeTranslations(etCommon, etLanding, etCategories, etProducts, etReviews, etHowItWorks, etAuth, etFaq, etContact, etAbout, etMap, etListings, etFavorites, etAddProduct, etTerms, etNavbar, etFooter, etResponsibleRenter, etPrivacyPolicy, etCancellationPolicy, etReportUser),
  en: mergeTranslations(enCommon, enLanding, enCategories, enProducts, enReviews, enHowItWorks, enAuth, enFaq, enContact, enAbout, enMap, enListings, enFavorites, enAddProduct, enTerms, enNavbar, enFooter, enResponsibleRenter, enPrivacyPolicy, enCancellationPolicy, enReportUser),
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('et');

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && (savedLocale === 'et' || savedLocale === 'en')) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
}
