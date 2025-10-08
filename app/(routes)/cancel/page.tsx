"use client"

import { XCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslation } from '@/lib/i18n/i18n-provider'

export default function Page() {
    const { t } = useTranslation()
    return (
        <div className="min-h-[90vh] flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-0 bg-transparent shadow-lg">
                <CardContent className="p-8 text-center">
                    <div className="mb-6">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-2">
                            {t('payment.failed')}
                        </h1>
                        <p className="text-muted-foreground">
                            {t('payment.failedMessage')}
                        </p>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 mb-6">
                        <h2 className="text-sm font-semibold mb-2">
                            {t('payment.whatHappened')}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            {t('payment.whatHappenedMessage')}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Button variant="outline" asChild className="w-full">
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                {t('payment.backToHome')}
                            </Link>
                        </Button>
                    </div>

                    <p className="text-xs text-muted-foreground mt-6">
                        {t('payment.needHelp')}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}