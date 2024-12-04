"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { productSchemaServer, Review, TProductServer } from "@/lib/product-validation";
import { addClick, addProduct, addReview, fetchAllProducts, fetchProduct, fetchProductsByCategories, getProductReviews } from "@/utils/supabase/queries/products";
import { Cart, CartItem, Product } from "@/utils/supabase/supabase.types";
import { passwordChangeValidator, TPasswordChangeSchema } from "@/lib/register-validation";
import { AuthError } from "@supabase/supabase-js";
import { fetchUserAddress } from "@/utils/supabase/queries/address";
import { addCartItem, CartItemWithDetails, createCart, getCart, GetCartResult, removeCartItem } from "@/utils/supabase/queries/cart";
import { addOrder, getOrderItemsByProduct } from "@/utils/supabase/queries/orders";
import { createComplaint, getAllComplaints, updateComplaint } from "@/utils/supabase/queries/complaint";
import { CheckCategories, FetchCategories } from "@/utils/supabase/queries/categories";
import { getPendingProducts } from "@/utils/supabase/queries/products";
import { updateProductStatus } from "@/utils/supabase/queries/products";
import { MaksekeskusClient } from "@/maksekeskus/client";
import { ITransaction } from "@/maksekeskus/maksekeskus_types";


export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/login", error.message);
  }

  return redirect("/profiil");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export const GetUserInfo = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser()
  return user
}

export const GetUserAddress = async () => {
  const supabase = createClient()
  const user = await supabase.auth.getUser()
  if (user.data.user) {
    const user_address = await fetchUserAddress(user.data.user.id)
    return user_address
  } else {
    return undefined
  }
}

export async function createProductAction(body: TProductServer) {
  try {
    const result = productSchemaServer.safeParse(body);
    const zodErrors: Record<string, string> = {};

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors[issue.path[0]] = issue.message;
      });
      return { errors: zodErrors, status: 400 };
    }

    //check if user has accepted terms and service
    const user = await GetUserInfo()
    if (user.error) {
      return { error: "Unexpected error occured", status: 500 }
    }

    const { error } = await addProduct(result.data);
    if (error) {
      return { error: 'Unexpected error occurred', status: 500 };
    }

    return { data: "Product successfully added", status: 200 };
  } catch (error) {
    void error;
    return { error: 'Unexpected error occurred', status: 500 };
  }
}

export async function fetchProducts(page: number, currentSort: string | undefined): Promise<{ data: Product[] | undefined, error: string | undefined, totalCount: number }> {
  return await fetchAllProducts(page, currentSort)
}

export async function FetchProductsByCategories(categories: string[], page: number, currentSort: string | undefined): Promise<{ data: Product[] | undefined, error: string | undefined, totalCount: number }> {
  return await fetchProductsByCategories(categories, page, currentSort)
}

export async function changePasswordAction(pw: TPasswordChangeSchema): Promise<{ data: undefined, error: string | undefined | Record<string, string> | AuthError }> {
  try {
    const result = passwordChangeValidator.safeParse(pw);
    const zodErrors: Record<string, string> = {};

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors[issue.path[0]] = issue.message;
      });
      return {
        data: undefined,
        error: zodErrors,
      }
    }

    const supabase = createClient();

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        data: undefined,
        error: "Unauthorized",
      }
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: result.data.password,
    });

    if (updateError) {
      if (updateError.code === "same_password") {
        return {
          data: undefined,
          error: "New password can't be the old one!"
        }
      }
      return {
        data: undefined,
        error: updateError
      }
    }
    return {
      data: undefined,
      error: undefined,
    }
  } catch (error: unknown) {
    void error

    if (error instanceof Error) {
      return {
        data: undefined,
        error: error.message,
      }
    } else {
      return {
        data: undefined,
        error: "An unknown error occurred",
      }
    }
  }
}

export async function addReviewAction(review: Review) {
  try {
    await addReview(review)
  } catch (error) {
    void error
  }
}


export async function createCartAction(userID: string): Promise<{ data: Cart | undefined, error: string | undefined }> {
  return await createCart(userID)
}


export async function addCartItemAction(from: Date | null, to: Date | null, product_id: number, cart_id: number): Promise<{ data: CartItem | undefined, error: string | undefined }> {
  return await addCartItem(from, to, product_id, cart_id)
}

export async function getCartAction(userID: string): Promise<GetCartResult> {
  return await getCart(userID)
}

export async function removeCartItemAction(cart_item_id: number, cart_id: number): Promise<{ data: string | undefined, error: string | undefined }> {
  return removeCartItem(cart_item_id, cart_id)

}

export async function addOrderAction(cart: CartItemWithDetails[], transaction_id: string) {
  return await addOrder(cart, transaction_id)
}

export async function createComplaintAction(text: string) {
  return await createComplaint(text)
}

export async function getAllComplaintsAction() {
  return await getAllComplaints()
}

export async function updateComplaintAction(id: number) {
  return await updateComplaint(id)
}

export async function fetchCategoriesAction() {
  return await FetchCategories()
}

export async function fetchProductsByCategoriesAction(categories: string[], page: number, sort: string | undefined) {
  return await FetchProductsByCategories(categories, page, sort)
}

export async function checkCategoriesAction(categories: string[]) {
  return await CheckCategories(categories)
}

export async function fetchProductAction(product_id: number) {
  return await fetchProduct(product_id)
}

export async function getProductReviewsAction(product_id: number) {
  return await getProductReviews(product_id)
}

export async function addClickAction(id: number) {
  return await addClick(id)
}

export async function getOrderItemsByProductAction(product_id: number) {
  return await getOrderItemsByProduct(product_id)
}

export async function getPendingProductsAction() {
  return await getPendingProducts()
}

export async function updateProductStatusAction(product_id: number, status: string) {
  return await updateProductStatus(product_id, status)
}

export async function createTransactionAction(transaction: ITransaction) {
  const apiKey = process.env.SECRET_KEY

  if (!apiKey) {
    console.log("EI OLEEEE KEEEEYD")
  }
  const paymentClient = new MaksekeskusClient(apiKey!)

  return await paymentClient.createTransaction(transaction)
} 