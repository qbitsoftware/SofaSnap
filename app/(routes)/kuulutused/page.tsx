import { fetchUserProducts } from '@/utils/supabase/queries/products'
import React, { Suspense } from 'react'
import UserListings from './_components/user-listings'
import { GetUserInfo } from '@/app/actions'
import { redirect } from 'next/navigation'
import LoadingSpinner from './_components/loading-spinner'

const UserProductsContent = async () => {
    const prods = await fetchUserProducts()
    const user = await GetUserInfo()

    if (!user.data.user) {
        redirect("/login")
    }

    if (prods.data && prods.data.length > 0) {
        return <UserListings listings={prods.data} />
    } else {
        return (
            <div className="text-center p-4">
                <p>Aktiivsed kuulutused puuduvad.</p>
            </div>
        )
    }
}

const Page = () => {
    return (
        <div className="container mx-auto p-4">
            <Suspense fallback={<LoadingSpinner />}>
                <UserProductsContent />
            </Suspense>
        </div>
    )
}

export default Page