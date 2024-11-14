import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserComplaints } from './complaints'
import { ProductApplications } from './product-applications'
import { getAllComplaintsAction } from '@/app/actions'
import { getPendingProductsAction } from '@/app/actions'
import { Card, CardContent } from '@/components/ui/card'

export default async function AdminPanel() {
    const { data } = await getAllComplaintsAction()
    const { data: productData} = await getPendingProductsAction()
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Admin paneel</h1>
            <Tabs defaultValue="applications">
                <TabsList className='bg-white'>
                    <TabsTrigger value="applications">Toote lisamised</TabsTrigger>
                    <TabsTrigger value="complaints">Kaebused</TabsTrigger>
                </TabsList>
                <TabsContent value="applications">
                    {productData ?
                        <ProductApplications products={productData} />
                        : <div>
                            <Card className="text-center p-6 bg-white">
                                <CardContent>
                                    <p className="text-xl font-semibold">Pole kuulutusi, mida hinnata</p>
                                    <p className="text-muted-foreground mt-2">Hetkel on aega puhkamiseks</p>
                                </CardContent>
                            </Card>
                        </div>
                    }
                </TabsContent>
                <TabsContent value="complaints">
                    <UserComplaints complaints={data} />
                </TabsContent>
            </Tabs>
        </div>
    )
}