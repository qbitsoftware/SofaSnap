import { createCheckoutSession, deleteProductAction } from "@/app/actions"
import { useToast } from "@/components/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProductAndCategories } from "@/utils/supabase/queries/products"
import { Edit, Trash, Eye, DollarSign } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useTranslation } from "@/lib/i18n/i18n-provider"

export default function ListingCard({ listing }: { listing: ProductAndCategories }) {

    const [isOpen, setIsOpen] = useState(false)
    const toast = useToast()
    const { t } = useTranslation()

    const router = useRouter()

    const handlePay = async () => {
        const { url } = await createCheckoutSession()
        // console.log(url)
        if (url) {
            router.push(url)
        }
    }

    const handleDelete = async (product_id: number) => {
        try {
            const result = await deleteProductAction(product_id)
            console.log(result)
            toast.toast({ title: result.data })
            setIsOpen(false)
            router.refresh()

        } catch (error) {
            void error;
            toast.toast({ title: t('listings.card.errorMessage') })
        }
    }

    return (
        <div>
            <Card className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ease-in-out bg-white border-0">
                <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row" >
                        <div className="relative w-full md:w-72 h-48 md:h-auto">
                            <Image
                                src={listing.product.preview_image}
                                alt={listing.product.name}
                                layout="fill"
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, 288px"
                                className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                            />
                        </div>
                        <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2 gap-3">
                                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">{listing.product.name}</h2>
                                    <Badge variant="outline" className="capitalize text-xs shrink-0 border-gray-300">
                                        {listing.product.type == "sell" ? t('listings.card.sale') : t('listings.card.rent')}
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                    {listing.product.description}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <span className="text-xl md:text-2xl font-bold text-gray-900">
                                    {listing.product.price.toFixed(2)}€
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    <Link href={`/tooted/${listing.product.id}`} onClick={(e) => e.stopPropagation()}>
                                        <Button variant="outline" size="sm" className="text-xs">
                                            <Eye className="h-3.5 w-3.5 mr-1.5" />
                                            {t('listings.card.preview')}
                                        </Button>
                                    </Link>

                                    <Link href={`/kuulutused/${listing.product.id}`} onClick={(e) => e.stopPropagation()}>
                                        <Button variant="outline" size="sm" className="text-xs">
                                            <Edit className="h-3.5 w-3.5 mr-1.5" />
                                            {t('listings.card.edit')}
                                        </Button>
                                    </Link>
                                    {listing.product.status !== "accepted" && (
                                        <Button variant="outline" size="sm" className="bg-green-50 hover:bg-green-100 border-green-300 text-green-700 text-xs" onClick={() => handlePay()}>
                                            <DollarSign className="h-3.5 w-3.5 mr-1.5" />
                                            {t('listings.card.pay')}
                                        </Button>
                                    )}
                                    <Button onClick={() => setIsOpen(true)} variant="destructive" size="sm" className="text-xs">
                                        <Trash className="h-3.5 w-3.5 mr-1.5" />
                                        {t('listings.card.delete')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('listings.card.deleteDialog.title')}</DialogTitle>
                        <DialogDescription>
                            {t('listings.card.deleteDialog.description')}
                        </DialogDescription>
                        <Button className="!mt-4" onClick={() => handleDelete(listing.product.id)} variant={"destructive"}>
                            <Trash className="h-4 w-4 mr-2" />
                            {t('listings.card.delete')}
                        </Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
