"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProductAndCategory } from "@/utils/supabase/queries/products"
import { AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Edit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"

export default function ListingCard({ listing }: { listing: ProductAndCategory }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -300,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 300,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div>
            <Card className="overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 ease-in-out bg-white">
                <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row" onClick={() => setIsModalOpen(true)}>
                        <div className="relative w-full md:w-64 h-48">
                            <Image
                                src={listing.products.preview_image}
                                alt={listing.products.name}
                                layout="fill"
                                objectFit="cover"
                                sizes="(max-width: 768px) 100vw, 256px"
                            />
                        </div>
                        <div className="p-6 cursor-pointer flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-semibold">{listing.products.name}</h2>
                                <Badge variant="outline" className="capitalize">
                                    {listing.products.type == "sell" ? "müük" : "rent"}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground  md:max-w-[500px] mb-4 line-clamp-2 overflow-hidden text-ellipsis whitespace-nowrap">{listing.products.description}</p>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-2xl font-bold">${listing.products.price.toFixed(2)}</span>
                                <div className="flex space-x-2">
                                    <Link href={`/kuulutused/${listing.products.id}`} onClick={(e) => e.stopPropagation()}>
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
            <AnimatePresence>
                {isModalOpen && (
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogContent className="sm:max-w-[700px]">
                            <DialogHeader>
                                <DialogTitle>{listing.products.name}</DialogTitle>
                                <DialogDescription>
                                    <Badge variant="outline" className="capitalize mb-2">
                                        {listing.products.type}
                                    </Badge>
                                </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="h-[80vh]">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <div
                                            className="relative gap-[20px] w-full h-[275px] flex overflow-x-auto scroll-smooth"
                                            ref={scrollRef}
                                        >
                                            {listing.products.all_img && listing.products.all_img.map((img, index) => (
                                                <div key={index} className="relative min-w-[250px] h-full flex-shrink-0">
                                                    <Image
                                                        src={img}
                                                        alt={`${listing.products.name} - Image ${index + 1}`}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        sizes="(max-width: 768px) 100vw, 700px"
                                                        className="rounded-md"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2"
                                            onClick={scrollLeft}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                            onClick={scrollRight}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p>{listing.products.description}</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="font-semibold">Price:</span> ${listing.products.price.toFixed(2)}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Dimensions:</span> {listing.products.width}x{listing.products.heigth}x{listing.products.length}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Material:</span> {listing.products.material}
                                        </div>
                                        {listing.products.type === 'rent' && listing.products.start_date && listing.products.end_date && (
                                            <div>
                                                <div>
                                                    <span className="font-semibold">Start:</span> {new Date(listing.products.start_date).toLocaleDateString()}
                                                </div>
                                                <div>
                                                    <span className="font-semibold">End:</span> {new Date(listing.products.end_date).toLocaleDateString()}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Reviews</h3>
                                        <p>No reviews yet.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Questions</h3>
                                        <p>No questions yet.</p>
                                    </div>
                                </div>
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                )}
            </AnimatePresence>
        </div>
    )
}