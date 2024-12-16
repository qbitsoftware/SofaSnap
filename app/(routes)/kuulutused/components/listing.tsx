import { deleteProductAction } from "@/app/actions"
import { useToast } from "@/components/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProductAndCategories } from "@/utils/supabase/queries/products"
import { Edit, Trash, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ListingCard({ listing }: { listing: ProductAndCategories }) {

    const [isOpen, setIsOpen] = useState(false)
    const toast = useToast()

    const router = useRouter()

    const handleDelete = async (product_id: number) => {
        try {
            const result = await deleteProductAction(product_id)
            console.log(result)
            toast.toast({ title: result.data })
            setIsOpen(false)
            router.refresh()

        } catch (error) {
            void error;
            toast.toast({ title: "Midagi läks valesti" })
        }
    }

    return (
        <div>
            <Card className="overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 ease-in-out bg-white">
                <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row" >
                        <div className="relative w-full md:w-64 h-48">
                            <Image
                                src={listing.product.preview_image}
                                alt={listing.product.name}
                                layout="fill"
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, 256px"
                            />
                        </div>
                        <div className="p-6 flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-semibold">{listing.product.name}</h2>
                                <Badge variant="outline" className="capitalize">
                                    {listing.product.type == "sell" ? "müük" : "rent"}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground  md:max-w-[500px] mb-4 line-clamp-2 overflow-hidden text-ellipsis whitespace-nowrap">{listing.product.description}</p>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-2xl font-bold">${listing.product.price.toFixed(2)}</span>
                                <div className="flex space-x-2">
                                    <Link href={`/tooted/${listing.product.id}`} onClick={(e) => e.stopPropagation()}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4 mr-2" />
                                            Eelvaade
                                        </Button>
                                    </Link>
                                    <Link href={`/kuulutused/${listing.product.id}`} onClick={(e) => e.stopPropagation()}>
                                        <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4 mr-2" />
                                            Muuda
                                        </Button>
                                    </Link>
                                    <Button onClick={() => setIsOpen(true)} variant={"destructive"}>
                                        <Trash className="h-4 w-4 mr-2" />
                                        Kustuta
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
                        <DialogTitle>Kas olete kindel, et soovite kuulutuse kustutada?</DialogTitle>
                        <DialogDescription>
                            Peale kuulutuse eemaldamist ei ole võimalik kuulutust taastada.
                        </DialogDescription>
                        <Button className="!mt-4" onClick={() => handleDelete(listing.product.id)} variant={"destructive"}>
                            <Trash className="h-4 w-4 mr-2" />
                            Kustuta
                        </Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}