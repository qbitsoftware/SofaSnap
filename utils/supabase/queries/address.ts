import { eq } from "drizzle-orm"
import db from "../db"
import { address, address_join_product } from "../schema"

export const fetchProductAddress = async (id: number) => {
    try {
        const result = await db.select().from(address_join_product).innerJoin(address, eq(address_join_product.address_id, address.id)).where(eq(address_join_product.product_id, id))
        if (result.length == 0) {
            return {
                data: undefined,
                error: "No results found"
            }
        }
        return {
            data: result,
            error: undefined
        }
    } catch (error) {
        console.log("Error fetching product", error)
        return {
            data: undefined,
            error: "Server error"
        }
    }

}