'use client'

import { useEffect, useState } from 'react'
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


    if (!cart.data) {
        return (
            <ServerError />
        )
    }
    const [currentStep, setCurrentStep] = useState(0)
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethods | null>(null)
    const steps = ['Aadress', 'Maksmine', 'Kinnitus']

    const handleNextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }

    const handlePrevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0))
    }

    return (
        <div className="container mx-auto px-6 md:px-[64px] max-w-[1440px]">
            <Breadcrumb text='Kassa' link='/ostukorv' />
            <div className="flex flex-col lg:flex-row pt-20 gap-8 md:gap-12">
                <div className="hidden lg:block w-1/4">
                    <StepIndicator steps={steps} currentStep={currentStep} />
                </div>
                <div className="w-full lg:w-1/2">
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
                                    <PaymentSelection onNext={handleNextStep} onPrev={handlePrevStep} payment_options={paymentMethods} />
                                </TabsContent>
                                <TabsContent value="Kinnitus">
                                    <ThankYou onPrev={handlePrevStep} />
                                </TabsContent>
                            </CardContent>
                        </Card>
                    </Tabs>
                </div>
                <div className="w-full lg:w-1/4 mt-8 lg:mt-0">
                    <OrderSummary />
                </div>
            </div>
        </div>
    )
}

