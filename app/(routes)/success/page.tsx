"use client"

import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState, Suspense } from 'react'
import { useTranslation } from '@/lib/i18n/i18n-provider'
interface PaymentDetails {
    amount: number
    currency: string
    customer_email: string
}

function SuccessPageContent() {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
    const [loading, setLoading] = useState(true)

    const { t } = useTranslation()

    useEffect(() => {
        if (sessionId) {
            fetch('/api/payment/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setPaymentDetails(data.session)
                    }
                    setLoading(false)
                })
        }
    }, [sessionId])

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">{t('payment.loading')}</div>
    }

    return (
        <div className="min-h-[90vh] flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-0 bg-transparent shadow-lg">
                <CardContent className="p-8 text-center">
                    <div className="mb-6">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-2">
                            {t('payment.successful')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('payment.successfulMessage')}
                        </p>
                    </div>

                    {paymentDetails && (
                        <div className="bg-muted/50 rounded-lg p-4 mb-6">
                            <h2 className="text-sm font-semibold mb-2">
                                {t('payment.details')}
                            </h2>
                            <div className="text-xs text-muted-foreground space-y-1">
                                <p>{t('payment.amount')}: {(paymentDetails.amount / 100).toFixed(2)} {paymentDetails.currency.toUpperCase()}</p>
                                <p>{t('payment.email')}: {paymentDetails.customer_email}</p>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <Button asChild className="w-full">
                            <Link href="/kuulutused">
                                {t('payment.goToListings')}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>

                        <Button variant="outline" asChild className="w-full">
                            <Link href="/">
                                {t('payment.backToHome')}
                            </Link>
                        </Button>
                    </div>

                    <p className="text-xs text-muted-foreground mt-6">
                        {t('payment.emailSent')}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SuccessPageContent />
        </Suspense>
    )
}