'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Product } from '@/utils/supabase/supabase.types'
import { updateProductStatusAction } from "@/app/actions"
import Link from "next/link"
import { useToast } from "@/components/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Props {
    products: Product[]
}

export function ProductApplications({ products }: Props) {
    const router = useRouter()
    const toast = useToast()

    const resolveProduct = async (answer: string, product_id: number) => {
        try {
            await updateProductStatusAction(product_id, answer)
            if (answer == "accepted") {
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

    return (
        <div className="space-y-4">
            {products.map(app => (
                <Card key={app.id} className='bg-white'>
                    <CardHeader>
                        <CardTitle>{app.name}</CardTitle>
                        <CardDescription>Kasutaja ID: {app.user_id}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href={"/tooted/" + app.id}>
                            <Button variant="outline">Vaata kuulutust</Button>
                        </Link>
                        <p className="pt-5">Staatus: {app.status == "pending" ? "Ootel" : app.status == "accepted" ? "Tagasi lükatud" : "Vastu võetud"}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                        {app.status === 'pending' && (
                            <>
                                <Button onClick={() => resolveProduct("accepted", app.id)} variant="outline">Kinnita</Button>
                                <Button onClick={() => resolveProduct("rejected", app.id)} variant="outline">Lükka tagasi</Button>
                            </>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}