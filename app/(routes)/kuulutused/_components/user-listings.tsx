"use client"
import { motion } from 'framer-motion'
import ListingCard from './listing'
import { ProductAndCategories } from '@/utils/supabase/queries/products'
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { TabsList } from '@radix-ui/react-tabs'


interface UserListingsProps {
    listings: ProductAndCategories[]
}

export default function UserListings({ listings }: UserListingsProps) {
    console.log("Listings", listings)
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <motion.h1
                className="text-3xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Sinu Kuulutused
            </motion.h1>
            <Tabs defaultValue='accepted'>
                <TabsList className='bg-white p-1 rounded-md inline-tabs flex justify-evenly'>
                    <TabsTrigger className='w-full' value="rejected">Tagasi Lükatud</TabsTrigger>
                    <TabsTrigger className='w-full' value="pending">Läbi vaatamisel</TabsTrigger>
                    <TabsTrigger className='w-full' value="accepted">Aktiivsed</TabsTrigger>
                </TabsList>
                <TabsContent value='rejected'>
                    <div className="space-y-6">
                        {listings.map((listing, index) => {
                            if (listing.product.status == "rejected") {
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
                <TabsContent value='pending'>
                    <div className="space-y-6">
                        {listings.map((listing, index) => {
                            if (listing.product.status == "pending") {
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
                    <div className="space-y-6">
                        {listings.map((listing, index) => {
                            if (listing.product.status == "accepted") {
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

