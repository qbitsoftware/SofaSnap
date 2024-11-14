import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductAndCategories } from "@/utils/supabase/queries/products"
import { Edit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ListingCard({ listing }: { listing: ProductAndCategories }) {
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
                                    <Link href={`/kuulutused/${listing.product.id}`} onClick={(e) => e.stopPropagation()}>
                                        <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4 mr-2" />
                                            Muuda
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}