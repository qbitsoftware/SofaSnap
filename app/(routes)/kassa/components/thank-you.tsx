import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ThankYou({ onPrev }: { onPrev: () => void }) {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold">Thank You for Your Order!</h2>
      <p className="text-base">Your order has been successfully placed. We'll send you a confirmation email shortly.</p>
      <div className="flex flex-col gap-4">
        <Button onClick={onPrev} variant="secondary" className="w-full py-6">Back to Payment</Button>
        <Link href="/products" className="w-full">
          <Button className="w-full py-6 bg-accent text-accent-foreground">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  )
}

