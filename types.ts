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

export type Listing = {
    user_id: string;
    name: string;
    category: string;
    sub_category: string;
    width: number;
    heigth: number;
    length: number;
    material: string;
    description?: string;
    start_date?: Date;
    end_date?: Date;
    type: string;
    price: number;
    address: string;
    all_img: string[];
}

