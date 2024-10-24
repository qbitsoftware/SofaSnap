import { ProductWithAddress } from '@/utils/supabase/supabase.types'
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from 'zustand'
import { CartItem } from '@/lib/product-validation';
import { toast } from 'react-hot-toast'

interface CartStore {
    items: CartItem[]
    addItem: (data: CartItem) => void
    removeItem: (id: number) => void
    removeAll: () => void
}



const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data: CartItem) => {
            const currentItems = get().items
            const existingItem = currentItems.find((items) => items.id == data.id);

            if (existingItem) {
                return toast( "Toode on juba ostukorvis" )
            }

            set({ items: [...get().items, data] })
            toast.success("Toode lisatud ostukorvi")
        },
        removeItem: (id: number) => {
            set({ items: get().items.filter((item) => item.id != id) })
            toast.success("Toode ostukorvist eemaldatud" )
        },
        removeAll: () => set({ items: [] })
    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    })
)

export default useCart;