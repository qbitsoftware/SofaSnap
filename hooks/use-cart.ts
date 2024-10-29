import { CartItemTS, CartItemJoinProduct } from '@/utils/supabase/supabase.types';
import { toast } from 'react-hot-toast';
import { GetUserInfo, addCartItemAction, createCartAction, getCartAction, removeCartItemAction } from '@/app/actions';
import { GetCartResult } from '@/utils/supabase/queries/cart';

interface CartService {
    getCartItems: () => Promise<GetCartResult> ;
    addItemToCart: (data: CartItemTS) => Promise<void>;
    removeItemFromCart: (id: number, cart_id: number) => Promise<void>;
}

export const useCart = (user_id: string): CartService => {
    const getCartItems = async (): Promise<GetCartResult> => {
        return await getCartAction(user_id)

    };
    const addItemToCart = async (data: CartItemTS): Promise<void> => {
        try {
            const { data: cartData, error: createCartError } = await createCartAction(user_id);

            if (createCartError) {
                toast.error(createCartError)
            }
            const { data: cartItemData, error: addItemError } = await addCartItemAction(
                data.from,
                data.to,
                data.product_id,
                cartData?.id!
            );

            console.log("JOUUUUU",cartItemData, addItemError)

            if (cartItemData && !addItemError ) {
                toast.success("Toode lisatud ostukorvi");
            } else if (cartItemData && addItemError) {
                toast("Toode on juba ostukorvi lisatud");
            }

        
        } catch (error) {
            console.error("Failed to add item to cart:", error);
            toast.error("Failed to add item to cart");
        }
    };
    const removeItemFromCart = async (id: number, cart_id: number): Promise<void> => {
        try {
            const { data, error} = await removeCartItemAction(id, cart_id);
            if (data && !error) {
                toast.success(data);
            }
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
            toast.error("Failed to remove item from cart");
        }
    };

    return { getCartItems, addItemToCart, removeItemFromCart };
};
