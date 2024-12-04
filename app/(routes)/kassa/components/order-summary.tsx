import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CartItemWithDetails } from '@/utils/supabase/queries/cart'
import { calculatePrice } from '@/lib/utils'
import Image from 'next/image'
import { OrderItemJoinProduct } from '@/utils/supabase/supabase.types'

interface Props {
  cartItems?: CartItemWithDetails[]
  orderItems?: OrderItemJoinProduct[]
}

export default function OrderSummary({ cartItems, orderItems }: Props) {
  let price;
  if (cartItems) {
    price = calculatePrice(cartItems)
  }

  const calculateDays = (start: Date, end: Date) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime()) + 1
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Tellimuse andmed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <span className="text-lg font-medium">Tooted</span>
          <Separator className="w-full" />
          {
            cartItems ? (
              cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 bg-accent/50 rounded-lg">
                  <Image
                    src={item.product.preview_image}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover inline md:hidden lg:inline"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.product.price} € / päev</p>
                    <div className="flex">
                      {item.product.type === 'rent' && item.cart_item.from && item.cart_item.to && (
                        <p className="text-sm text-muted-foreground">
                          {`${calculateDays(item.cart_item.from, item.cart_item.to)} päeva`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : orderItems ? (
              orderItems.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 bg-accent/50 rounded-lg">
                  <Image
                    src={item.product.preview_image}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover inline md:hidden lg:inline"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.product.price} € / päev</p>
                    <div className="flex">
                      {item.product.type === 'rent' && item.order_item.from && item.order_item.to && (
                        <p className="text-sm text-muted-foreground">
                          {`${calculateDays(item.order_item.from, item.order_item.to)} päeva`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Error</div>
            )
          }
        </div>
        {cartItems && price && (
          <div>
            <Separator className="my-4" />
            <div className="flex justify-between text-base">
              <span>Summa</span>
              <span>{price.price} €</span>
            </div>
            <div className="flex justify-between text-base">
              <span>Teenustasu</span>
              <span>{price.fee} €</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Kokku</span>
              <span>{price.total} €</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card >
  )
}

