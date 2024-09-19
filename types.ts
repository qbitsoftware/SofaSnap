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


export type Product = {
    id: string,
    name: string,
    description: string
    price: number
    rating: number
    preview_image: string
}
