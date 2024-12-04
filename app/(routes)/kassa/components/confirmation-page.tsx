import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import OrderSummary from './order-summary'
import { OrderItemJoinProduct } from '@/utils/supabase/supabase.types'
import { formatEstonianDate } from '@/utils/utils'

interface Props {
    order_items: OrderItemJoinProduct[]
}

export default function OrderConfirmation({ order_items }: Props) {


    return (
        <div className="container mx-auto px-6 md:px-[64px] max-w-[1440px]">
            <Link href="/" className="inline-block mt-6 md:mt-10">
                <ChevronLeft strokeWidth={1} className="w-11 h-11" color="#000000" />
            </Link>
            <h1 className="text-3xl md:text-5xl font-semibold mb-8 md:mb-12 mt-6 md:mt-10">Tellimus #{order_items[0].order.id}</h1>

            <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
                <div className="w-full lg:w-2/3">
                    <Card className='bg-card'>
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold">Tellimuse andmed</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex justify-between text-base">
                                <span className="font-medium">Tellimuse nr:</span>
                                <span>{order_items[0].order.id}</span>
                            </div>
                            <div className="flex justify-between text-base">
                                <span className="font-medium">Kuupäev:</span>
                                <span>{formatEstonianDate(order_items[0].order.created_at)}</span>
                            </div>
                            <Separator />
                            <div className="space-y-4">
                                {order_items.map((item, index) => (
                                    <div key={index} className="flex justify-between text-base">
                                        <span>{item.product.name} </span>
                                        {/* <span>${(item.order_item.from?.getDate() - ite).toFixed(2)}</span> */}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="w-full lg:w-1/3">
                    <OrderSummary orderItems={order_items} />
                </div>
            </div>

            <div className="mt-12 md:mt-20 space-y-4">
                <p className="text-center text-lg">Aitäh tellimuse eest! Oleme saatnud kinnituskirja teie registreeritud e-posti aadressile.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/tooted" className="w-full sm:w-auto">
                        <Button className="w-full py-6 bg-accent text-white">Vaata rohkem tooteid</Button>
                    </Link>
                </div>
            </div>

            <Separator className="w-full mt-12 md:mt-20 bg-[#1E1E1E]/30" />
        </div>
    )
}
