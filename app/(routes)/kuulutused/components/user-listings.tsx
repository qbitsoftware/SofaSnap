"use client"
import { motion } from 'framer-motion'
import ListingCard from './listing'
import { ProductAndCategory } from '@/utils/supabase/queries/products'


interface UserListingsProps {
    listings: ProductAndCategory[]
}

export default function UserListings({ listings }: UserListingsProps) {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <motion.h1
                className="text-3xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Aktiivsed kuulutused
            </motion.h1>
            <div className="space-y-6">
                {listings.map((listing, index) => (
                    <motion.div
                        key={listing.products.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <ListingCard listing={listing} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

