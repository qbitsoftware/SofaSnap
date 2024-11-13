"server-only"

import { eq } from "drizzle-orm";
import db from "../db";
import { complaint } from "../schema";

export const createComplaint = async (comp_text: string) => {
    try {
        await db.insert(complaint).values({
            text: comp_text,
        });

        return {
            data: undefined,
            error: undefined
        };
    } catch (error) {
        console.log(error);
        return {
            data: undefined,
            error: "Server error"
        }
    }
};

export const getAllComplaints = async () => {
    try {
        const result = await db.select().from(complaint).where(eq(complaint.resolved, false))

        return {
            data: result,
            error: undefined
        };
    } catch (error) {
        console.log(error);
        return {
            data: undefined,
            error: "Server error"
        }
    }
};

export const updateComplaint = async (id: number) => {
    try {

        await db.update(complaint).set({ resolved: true }).where(eq(complaint.id, id))

        return {
            data: undefined,
            error: undefined
        };
    } catch (error) {
        console.log(error);
        return {
            data: undefined,
            error: "Server error"
        }
    }
};