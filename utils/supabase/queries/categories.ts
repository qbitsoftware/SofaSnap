import { arrayContains, inArray } from "drizzle-orm"
import db from "../db"
import { category } from "../schema"
import { NextResponse } from "next/server"
import { isValid } from "zod"


export const CheckCategories = async (categories: string[]) => {
    try {
        const result = await db.select()
            .from(category)
            .where(inArray(category.name, categories))

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
            error: "Server Error"
        }
    }
}