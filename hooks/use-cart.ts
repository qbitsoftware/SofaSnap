import { CartItemTS, CartItemJoinProduct } from '@/utils/supabase/supabase.types';
import { toast } from 'react-hot-toast';
import { GetUserInfo, addCartItemAction, createCartAction, getCartAction, removeCartItemAction } from '@/app/actions';
import { GetCartResult } from '@/utils/supabase/queries/cart';

interface CartService {
    getCartItems: (userID: string | undefined) => Promise<GetCartResult> ;
    addItemToCart: (data: CartItemTS, userID: string) => Promise<void>;
    removeItemFromCart: (id: number, cart_id: number) => Promise<void>;
}

export const useCart = (): CartService => {
    const getCartItems = async (userID: string | undefined): Promise<GetCartResult> => {
        if (!userID) {
            return {
                data: undefined,
                error: "UserID nor provided"
            }
        }
        return await getCartAction(userID)

    };
    const addItemToCart = async (data: CartItemTS, userID: string): Promise<void> => {
        try {
            const { data: cartData, error: createCartError } = await createCartAction(userID);

            if (createCartError) {
                toast.error(createCartError)
            }
            const { data: cartItemData, error: addItemError } = await addCartItemAction(
                data.from,
                data.to,
                data.product_id,
                cartData?.id!
            );


            console.log(cartItemData, addItemError)
            if (cartItemData && !addItemError ) {
                toast.success("Toode lisatud ostukorvi");
                return
            } else if (cartItemData && addItemError) {
                toast("Toode on juba ostukorvi lisatud");
                return
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
