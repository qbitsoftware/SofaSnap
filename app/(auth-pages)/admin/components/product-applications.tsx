'use client'
import { Button } from "@/components/ui/button"
import { Product } from '@/utils/supabase/supabase.types'
import { updateProductStatusAction } from "@/app/actions"
import Link from "next/link"
import { useToast } from "@/components/hooks/use-toast"
import { useRouter } from "next/navigation"
import { EProductStatus } from "@/types"
import { ExternalLink, Check, X, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useMemo } from "react"

interface Props {
    products: Product[]
}

export function ProductApplications({ products }: Props) {
    const router = useRouter()
    const toast = useToast()
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [sortBy, setSortBy] = useState<string>("newest")

    const resolveProduct = async (answer: string, product_id: number) => {
        try {
            await updateProductStatusAction(product_id, answer)
            if (answer == EProductStatus.ACCEPTED) {
                toast.toast({ title: "Kuulutus edukalt vastuvõetud" })
            } else {
                toast.toast({ title: "Kuulutus edukalt tagasi lükatud" })
            }
        } catch (error) {
            console.error(error)
            toast.toast({ title: "Kuulutuse hindamisega tekkis probleem" })
        }
        router.refresh()
    }

    const getStatusBadge = (status: string | null) => {
        switch (status) {
            case EProductStatus.NOT_PAID:
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Maksmise ootel</span>
            case EProductStatus.ACCEPTED:
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Vastu võetud</span>
            case EProductStatus.REJECTED:
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Tagasi lükatud</span>
            default:
                return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status || 'Teadmata'}</span>
        }
    }

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = [...products]

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.id.toString().includes(query) ||
                product.material.toLowerCase().includes(query) ||
                product.user_id.toLowerCase().includes(query)
            )
        }

        // Filter by status
        if (statusFilter !== "all") {
            filtered = filtered.filter(product => product.status === statusFilter)
        }

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                case "oldest":
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                case "price-high":
                    return b.price - a.price
                case "price-low":
                    return a.price - b.price
                case "name":
                    return a.name.localeCompare(b.name)
                default:
                    return 0
            }
        })

        return filtered
    }, [products, searchQuery, statusFilter, sortBy])

    const statusCounts = useMemo(() => ({
        all: products.length,
        [EProductStatus.NOT_PAID]: products.filter(p => p.status === EProductStatus.NOT_PAID).length,
        [EProductStatus.ACCEPTED]: products.filter(p => p.status === EProductStatus.ACCEPTED).length,
        [EProductStatus.REJECTED]: products.filter(p => p.status === EProductStatus.REJECTED).length,
    }), [products])

    return (
        <div className="space-y-4">
            {/* Filters Section */}
            <div className="bg-white rounded-lg border shadow-sm p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Otsi nime, ID, materjali või kasutaja järgi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="w-full lg:w-48">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4" />
                                    <SelectValue placeholder="Staatus" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Kõik ({statusCounts.all})</SelectItem>
                                <SelectItem value={EProductStatus.NOT_PAID}>
                                    Maksmise ootel ({statusCounts[EProductStatus.NOT_PAID]})
                                </SelectItem>
                                <SelectItem value={EProductStatus.ACCEPTED}>
                                    Vastu võetud ({statusCounts[EProductStatus.ACCEPTED]})
                                </SelectItem>
                                <SelectItem value={EProductStatus.REJECTED}>
                                    Tagasi lükatud ({statusCounts[EProductStatus.REJECTED]})
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sort */}
                    <div className="w-full lg:w-48">
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sorteeri" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Uusimad</SelectItem>
                                <SelectItem value="oldest">Vanimad</SelectItem>
                                <SelectItem value="price-high">Hind: kõrge → madal</SelectItem>
                                <SelectItem value="price-low">Hind: madal → kõrge</SelectItem>
                                <SelectItem value="name">Nimi: A → Z</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Active Filters Summary */}
                {(searchQuery || statusFilter !== "all") && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">{filteredProducts.length}</span>
                        <span>tulemus{filteredProducts.length !== 1 ? 't' : ''}</span>
                        {searchQuery && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSearchQuery("")}
                                className="h-6 px-2 text-xs"
                            >
                                Tühista otsing
                            </Button>
                        )}
                        {statusFilter !== "all" && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setStatusFilter("all")}
                                className="h-6 px-2 text-xs"
                            >
                                Tühista filter
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-gray-700">ID</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-700">Nimi</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-700">Hind</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-700">Materjal</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-700">Kasutaja ID</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-700">Staatus</th>
                                <th className="px-4 py-3 text-right font-medium text-gray-700">Tegevused</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredProducts.map(app => (
                                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{app.id}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">{app.name}</td>
                                    <td className="px-4 py-3 text-gray-900 font-medium">{app.price}€</td>
                                    <td className="px-4 py-3 text-gray-600 text-xs">{app.material}</td>
                                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{app.user_id?.slice(0, 8)}...</td>
                                    <td className="px-4 py-3">{getStatusBadge(app.status)}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={"/tooted/" + app.id} target="_blank">
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                    <ExternalLink className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            {app.status === EProductStatus.NOT_PAID && (
                                                <>
                                                    <Button
                                                        onClick={() => resolveProduct(EProductStatus.ACCEPTED, app.id)}
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => resolveProduct(EProductStatus.REJECTED, app.id)}
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            )}
                                            {app.status === EProductStatus.REJECTED && (
                                                <Button
                                                    onClick={() => resolveProduct(EProductStatus.ACCEPTED, app.id)}
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredProducts.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        {searchQuery || statusFilter !== "all"
                            ? "Vastavaid kuulutusi ei leitud"
                            : "Kuulutusi ei leitud"}
                    </div>
                )}
            </div>
        </div>
    )
}