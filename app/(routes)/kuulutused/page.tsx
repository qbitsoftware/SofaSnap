import { fetchUserProducts } from '@/utils/supabase/queries/products'
import React from 'react'
import UserListings from './components/user-listings'
import { GetUserInfo } from '@/app/actions'
import { redirect } from 'next/navigation'

const Page = async () => {
    const prods = await fetchUserProducts()
    const user = await GetUserInfo()
    if (!user.data.user) {
        redirect("/login")
    }

    if (prods.data) {
        return (
            <div>
                <UserListings listings={prods.data} />
            </div>
        )
    } else {
        return (
            <div>
                Aktiivsed kuulutused puuduvad.
            </div>
        )
    }
}

export default Page