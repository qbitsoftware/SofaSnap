"use client"
import { motion } from 'framer-motion'
import ListingCard from './listing'
import { ProductAndCategories } from '@/utils/supabase/queries/products'
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { TabsList } from '@radix-ui/react-tabs'
import { EProductStatus } from '@/types'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { AlertCircle, CheckCircle, CreditCard } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useTranslation } from '@/lib/i18n/i18n-provider'


interface UserListingsProps {
    listings: ProductAndCategories[]
}

export default function UserListings({ listings }: UserListingsProps) {
    const { t } = useTranslation()
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const tab = searchParams.get('tab') || 'accepted'

    const handleTabChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('tab', value)
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <motion.h1
                className="text-3xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {t('listings.title')}
            </motion.h1>
            <Tabs defaultValue={tab} onValueChange={handleTabChange}>
                <TabsList className='bg-white p-1 rounded-md inline-tabs flex justify-evenly'>
                    <TabsTrigger className='w-full' value={EProductStatus.REJECTED}>{t('listings.tabs.rejected')}</TabsTrigger>
                    <TabsTrigger className='w-full' value={EProductStatus.ACCEPTED}>{t('listings.tabs.accepted')}</TabsTrigger>
                    <TabsTrigger className='w-full' value={EProductStatus.NOT_PAID}>{t('listings.tabs.notPaid')}</TabsTrigger>
                </TabsList>
                <TabsContent value='rejected'>
                    <Alert className="mb-6 border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertTitle className="text-red-900">{t('listings.alerts.rejected.title')}</AlertTitle>
                        <AlertDescription className="text-red-800">
                            {t('listings.alerts.rejected.description')}
                        </AlertDescription>
                    </Alert>
                    <div className="space-y-6">
                        {listings.map((listing, index) => {
                            if (listing.product.status == EProductStatus.REJECTED) {
                                return (
                                    <motion.div
                                        key={listing.product.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <ListingCard listing={listing} />
                                    </motion.div>
                                )
                            }
                        })}
                    </div>
                </TabsContent>
                <TabsContent value='accepted'>
                    <Alert className="mb-6 border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-900">{t('listings.alerts.accepted.title')}</AlertTitle>
                        <AlertDescription className="text-green-800">
                            {t('listings.alerts.accepted.description')}
                        </AlertDescription>
                    </Alert>
                    <div className="space-y-6">
                        {listings.map((listing, index) => {
                            if (listing.product.status == EProductStatus.ACCEPTED) {
                                return (
                                    <motion.div
                                        key={listing.product.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <ListingCard listing={listing} />
                                    </motion.div>
                                )
                            }
                        })}
                    </div>
                </TabsContent>
                <TabsContent value='not_paid'>
                    <Alert className="mb-6 border-orange-200 bg-orange-50">
                        <CreditCard className="h-4 w-4 text-orange-600" />
                        <AlertTitle className="text-orange-900">{t('listings.alerts.notPaid.title')}</AlertTitle>
                        <AlertDescription className="text-orange-800">
                            {t('listings.alerts.notPaid.description')}
                        </AlertDescription>
                    </Alert>
                    <div className="space-y-6">
                        {listings.map((listing, index) => {
                            if (listing.product.status == EProductStatus.NOT_PAID) {
                                return (
                                    <motion.div
                                        key={listing.product.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <ListingCard listing={listing} />
                                    </motion.div>
                                )
                            }
                        })}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

