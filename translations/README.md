# Translations

This directory contains all translation files for the application, organized by locale and namespace.

## Structure

```
translations/
├── et/                    # Estonian translations
│   ├── common.json       # Shared translations (buttons, errors, etc.)
│   ├── landing.json      # Landing page
│   ├── categories.json   # Categories page
│   ├── products.json     # Product-related translations
│   └── reviews.json      # Reviews section
└── en/                    # English translations
    ├── common.json
    ├── landing.json
    ├── categories.json
    ├── products.json
    └── reviews.json
```

## Adding New Translations

### 1. Create a new namespace file

Create a new JSON file in both `et/` and `en/` directories:

```json
// translations/et/new-namespace.json
{
  "newNamespace": {
    "key": "value"
  }
}
```

### 2. Import in i18n provider

Update `lib/i18n/i18n-provider.tsx`:

```typescript
import etNewNamespace from '@/translations/et/new-namespace.json';
import enNewNamespace from '@/translations/en/new-namespace.json';

const translations: Record<Locale, any> = {
  et: mergeTranslations(etCommon, etLanding, ..., etNewNamespace),
  en: mergeTranslations(enCommon, enLanding, ..., enNewNamespace),
};
```

### 3. Use in components

```typescript
const { t } = useTranslation();
const text = t('newNamespace.key');
```

## Best Practices

1. **Organize by feature/route** - Keep translations for each feature or route in its own file
2. **Use nested keys** - Structure your translations hierarchically (e.g., `landing.hero.title`)
3. **Keep common translations separate** - Shared translations go in `common.json`
4. **Maintain parity** - Ensure all keys exist in both `et` and `en` versions
5. **Use descriptive keys** - Key names should clearly indicate what they translate

## Usage Example

```typescript
import { useTranslation } from '@/lib/i18n/i18n-provider';

function MyComponent() {
  const { t, locale, setLocale } = useTranslation();

  return (
    <div>
      <h1>{t('landing.hero.title')}</h1>
      <button onClick={() => setLocale('en')}>Switch to English</button>
    </div>
  );
}
```
