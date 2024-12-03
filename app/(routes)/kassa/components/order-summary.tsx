import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CartItemWithDetails } from '@/utils/supabase/queries/cart'
import { calculatePrice } from '@/lib/utils'

interface Props {
  cartItems: CartItemWithDetails[]
}

export default function OrderSummary({ cartItems }: Props) {
  const price = calculatePrice(cartItems)
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Tellimuse andmed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-base">
          <span>Tooted</span>
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
      </CardContent>
    </Card>
  )
}

