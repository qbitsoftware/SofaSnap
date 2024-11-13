import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserComplaints } from './complaints'
import { ProductApplications } from './product-applications'
import { getAllComplaintsAction } from '@/app/actions'


export default async function AdminPanel() {
    const { data } = await getAllComplaintsAction()
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Admin paneel</h1>
            <Tabs defaultValue="applications">
                <TabsList className='bg-white'>
                    <TabsTrigger value="applications">Toote lisamised</TabsTrigger>
                    <TabsTrigger value="complaints">Kaebused</TabsTrigger>
                </TabsList>
                <TabsContent value="applications">
                    <ProductApplications />
                </TabsContent>
                <TabsContent value="complaints">
                    <UserComplaints complaints={data} />
                </TabsContent>
            </Tabs>
        </div>
    )
}