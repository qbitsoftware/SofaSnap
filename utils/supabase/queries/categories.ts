"server only"

import { inArray } from "drizzle-orm"
import db from "../db"
import { category } from "../schema"


export const CheckCategories = async (categories: string[]) => {
    try {
        const result = await db.select().from(category).where(inArray(category.name_slug, categories))

        if (result.length != categories.length) {
            return {
                isValid: false,
                error: "Category not found",
            }
        }

        return {
            isValid: true,
            error: undefined
        }
    } catch (error) {
        return {
            isValid: false,
            error: "Server error"
        }
    }
}


export const FetchCategories = async () => {
    try {

        const result = await db.select().from(category)
        if (result.length == 0) {
            return {
                data: [],
                error: "No categories found",
            }
        }
        return {
            data: result,
            error: undefined
        }
    } catch (error) {
        console.log("fetching returned error", error)
        return {
            data: undefined,
            error: "Server error"
        }
    }
}
