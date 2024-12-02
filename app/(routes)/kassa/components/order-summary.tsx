import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function OrderSummary() {
  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Tellimuse andmed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-base">
          <span>Subtotal</span>
          <span>$99.99</span>
        </div>
        <div className="flex justify-between text-base">
          <span>Shipping</span>
          <span>$9.99</span>
        </div>
        <div className="flex justify-between text-base">
          <span>Tax</span>
          <span>$10.00</span>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>$119.98</span>
        </div>
      </CardContent>
    </Card>
  )
}

