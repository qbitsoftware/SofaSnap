import { GetUserInfo } from '@/app/actions'
import React from 'react'
import { Checkout } from './components/checkout'
import { getCart } from '@/utils/supabase/queries/cart'
import { ServerError } from '@/components/server-error'

const Page = async () => {
  const user = await GetUserInfo()

  if (!user || !user.data.user?.id) {
    return (
      <ServerError />
    )
  }

  const cart = await getCart(user.data.user?.id)

  if (cart.error && cart.error == "Server error") {
    return (
      <ServerError />
    )
  }
  return (
    <Checkout user={user.data.user} cart={cart} />
  )
}

export default Page