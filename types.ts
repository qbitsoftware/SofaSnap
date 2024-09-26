import { z } from "zod"

export type Category = {
    id: number,
    created_at: string,
    name: string,
    description: string,
    image: string,
}

export type Review = {
    id: number
    name: string
    image: string
    rating: number
    text: string
}


