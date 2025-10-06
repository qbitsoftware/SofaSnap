"use client"

import { ShoppingBag } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/i18n-provider'

interface EmptyStateProps {
  message: 'noProducts' | 'noProductsInCategory'
}

export function EmptyState({ message }: EmptyStateProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <ShoppingBag className="w-12 h-12 text-gray-400 mb-4" />
      <p className="text-lg font-medium text-gray-600">{t(`products.${message}`)}</p>
    </div>
  )
}
