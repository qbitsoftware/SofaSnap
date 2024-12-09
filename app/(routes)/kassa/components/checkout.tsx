'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import AddressInfo from './address-info'
import PaymentSelection from './payment-selection'
import ThankYou from './thank-you'
import StepIndicator from './step-indicator'
import OrderSummary from './order-summary'
import { Breadcrumb } from '@/components/breadcrumb'
import { User } from '@supabase/supabase-js'
import { GetCartResult } from '@/utils/supabase/queries/cart'
import { ServerError } from '@/components/server-error'
import { PaymentMethods } from '@/maksekeskus/maksekeskus_types'

interface CheckoutProps {
    user: User | null
    cart: GetCartResult
}

export const Checkout: React.FC<CheckoutProps> = ({ user, cart }) => {

    const [currentStep, setCurrentStep] = useState(0)
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethods | null>(null)

    if (!cart.data) {
        return (
            <ServerError />
        )
    }
    const steps = ['Aadress', 'Maksmine', 'Kinnitus']

    const handleNextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }

    const handlePrevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0))
    }

    return (
        <div className="container mx-auto px-6 md:px-[64px] max-w-[1440px] pb-10">
            <Breadcrumb text='Kassa' link='/ostukorv' />
            <div className="flex flex-col md:flex-row md:pt-20 gap-8 md:gap-12">
                <div className="hidden lg:block w-1/4 order-1">
                    <StepIndicator steps={steps} currentStep={currentStep} />
                </div>
                <div className="w-full md:w-2/3 lg:w-1/2 order-2">
                    <Tabs value={steps[currentStep]} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-8">
                            {steps.map((step, index) => (
                                <TabsTrigger
                                    key={step}
                                    value={step}
                                    disabled={index !== currentStep}
                                    className="data-[state=active]:bg-accent data-[state=active]:text-black"
                                >
                                    {step}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <Card>
                            <CardContent className="pt-6">
                                <TabsContent value="Aadress">
                                    <p className='italic pb-4'>Kontrollige, vajadusel muutke oma andmed</p>
                                    <AddressInfo onNext={handleNextStep} userData={user} cart={cart.data} setPaymentOptions={setPaymentMethods} />
                                </TabsContent>
                                <TabsContent value="Maksmine">
                                    <PaymentSelection onPrev={handlePrevStep} payment_options={paymentMethods} />
                                </TabsContent>
                                <TabsContent value="Kinnitus">
                                    <ThankYou onPrev={handlePrevStep} />
                                </TabsContent>
                            </CardContent>
                        </Card>
                    </Tabs>
                </div>
                <div className="w-full md:w-1/3 lg:w-1/4 mt-8 lg:mt-0 order-1 md:order-3">
                    <OrderSummary cartItems={cart.data} />
                </div>
            </div>
        </div>
    )
}

