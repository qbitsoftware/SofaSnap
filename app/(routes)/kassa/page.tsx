import { GetUserInfo } from '@/app/actions'
import React from 'react'
import { Checkout } from './components/checkout'
import { getCart } from '@/utils/supabase/queries/cart'
import { ServerError } from '@/components/server-error'
import { redirect } from 'next/navigation'
import OrderConfirmation from './components/confirmation-page'
import { OrderItemJoinProduct } from '@/utils/supabase/supabase.types'
import { getOrderItems } from '@/utils/supabase/queries/orders'

const Page = async ({ searchParams }: { searchParams: { id?: string } }) => {
  const user = await GetUserInfo()

  if (!user || !user.data.user?.id) {
    redirect("/")
  }

  const orderId = searchParams.id

  const cart = await getCart(user.data.user?.id)
  if (cart.error) {
    if (cart.error == "Server Error") {
      return (
        <ServerError />
      )
    } else if (cart.error == "Empty Cart Error" && orderId == "") {
      redirect("/")
    }
  }


  if (orderId) {
    const orderItems = await getOrderItems(Number(orderId))
    if (orderItems && orderItems.data) {
      return <OrderConfirmation order_items={orderItems.data} />
    } else {
      return <div>No order found</div>
    }
  }



  return (
    <Checkout user={user.data.user} cart={cart} />
  )
}

export default Page