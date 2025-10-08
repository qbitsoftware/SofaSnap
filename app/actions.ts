"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient, supabaseAdminClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { productSchemaServer, Review, TProductServer } from "@/lib/product-validation";
import { addClick, addProduct, addReview, deleteProduct, fetchAllProducts, fetchProduct, fetchProductsByCategories, getProductReviews } from "@/utils/supabase/queries/products";
import { Favorite, Product } from "@/utils/supabase/supabase.types";
import { passwordChangeValidator, TPasswordChangeSchema } from "@/lib/register-validation";
import { AuthError } from "@supabase/supabase-js";
import { fetchUserAddress } from "@/utils/supabase/queries/address";
import { createComplaint, getAllComplaints, updateComplaint } from "@/utils/supabase/queries/complaint";
import { CheckCategories, FetchCategories } from "@/utils/supabase/queries/categories";
import { getPendingProducts } from "@/utils/supabase/queries/products";
import { updateProductStatus } from "@/utils/supabase/queries/products";
import { MaksekeskusClient } from "@/maksekeskus/client";
import { ITransaction } from "@/maksekeskus/maksekeskus_types";
import { sendEmail } from "@/lib/emails";
import { addFavorite, removeFavorite } from "@/utils/supabase/queries/favorite";
import { ContactEmailData, EmailContent, EmailSendResult, OwnerInfo } from "@/types/email";
import { prepareEmailContent } from "@/lib/utils";
import type { Stripe } from "stripe";
import { stripe } from "@/lib/stripe";


export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const headersList = await headers();
  const origin = headersList.get("origin");

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
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/login", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const headersList = await headers();
  const origin = headersList.get("origin");
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
  const supabase = await createClient();

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
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export const GetUserInfo = async () => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser()
  return user
}

export const GetUserAddress = async () => {
  const supabase = await createClient()
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
      return { error: "user error", status: 500 }
    }

    const { error } = await addProduct(result.data);
    console.log("Error", error)
    if (error) {
      return { error: 'product add error', status: 500 };
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

    const supabase = await createClient();

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

export async function getPendingProductsAction() {
  return await getPendingProducts()
}

export async function updateProductStatusAction(product_id: number, status: string) {
  return await updateProductStatus(product_id, status)
}

export async function addToFavoritesAction(product_id: number, user_id: string): Promise<Favorite | undefined> {
  return await addFavorite(product_id, user_id)
}

export async function removeFromFavoritesAction(product_id: number, user_id: string): Promise<Favorite | undefined> {
  return await removeFavorite(product_id, user_id)
}

export async function createTransactionAction(transaction: ITransaction) {
  const apiKey = process.env.SECRET_KEY

  if (!apiKey) {
  }
  const paymentClient = new MaksekeskusClient(apiKey!)

  return await paymentClient.createTransaction(transaction)
}

export async function sendEmailAction(to: string, sub: string, content: string) {
  try {
    await sendEmail(to, sub, content)
  } catch (error) {
    console.error(error)
  }
}

export async function deleteProductAction(product_id: number): Promise<{ data: string | undefined, error: string | undefined }> {
  return await deleteProduct(product_id)
}

export async function sendContactEmailAction(
  data: ContactEmailData
): Promise<EmailSendResult> {
  try {
    const ownerInfo = await getOwnerInfo(data.ownerUserId);

    if (!ownerInfo) {
      return {
        success: false,
        error: 'Ei saanud kuulutuse omaniku kontaktandmeid. Palun proovige hiljem uuesti.',
      };
    }

    const emailContent = prepareEmailContent(data, ownerInfo);
    const emailSent = await sendEmailWithFallback(ownerInfo.email, emailContent, data.senderEmail);

    return emailSent
      ? { success: true }
      : { success: false, error: 'Email saatmine ebaõnnestus. Palun proovige hiljem uuesti.' };

  } catch (error) {
    console.error('Error sending contact email:', error);
    return {
      success: false,
      error: 'Tehnilised probleemid e-posti saatmisel'
    };
  }
}

async function getOwnerInfo(userId: string): Promise<OwnerInfo | null> {
  try {
    const supabase = await supabaseAdminClient()
    const { data: userData, error } = await supabase.auth.admin.getUserById(userId);

    if (error || !userData.user?.email) {
      console.error('Failed to get owner info:', error);
      return null;
    }

    return {
      email: userData.user.email,
      name: userData.user.user_metadata?.firstName ||
        userData.user.user_metadata?.name ||
        'Kuulutuse omanik',
    };
  } catch (error) {
    console.error('Auth admin API error:', error);
    return null;
  }
}

async function sendEmailWithFallback(
  to: string,
  content: EmailContent,
  replyTo: string
): Promise<boolean> {
  void replyTo;
  // try {
  //   const result = await resend.emails.send({
  //     from: 'Seatly <noreply@seatly.com>',
  //     to: [to],
  //     subject: content.subject,
  //     html: content.html,
  //     replyTo,
  //   });

  //   if (result.error) {
  //     throw new Error('Resend failed');
  //   }

  //   return true;
  // } catch (resendError) {
  //   console.warn('Resend failed, trying nodemailer fallback...', resendError);
  // }

  // Fallback to nodemailer
  try {
    await sendEmail(to, content.subject, content.html);
    return true;
  } catch (nodemailerError) {
    console.error('Both email services failed:', { nodemailerError });
    return false;
  }
}

export async function createCheckoutSession(product_id: number): Promise<{ url: string | null }> {
  const headersList = await headers();
  const origin: string = headersList.get("origin") as string;

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "EUR",
            product_data: {
              name: "Product listing fee",
            },
            unit_amount: 100,
          },
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?canceled=true`,
      metadata: {
        product_id: product_id.toString(),
        type: "product_listing",
      }
    });

  return {
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(
  data: FormData,
): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: 100,
      automatic_payment_methods: { enabled: true },
      currency: "EUR",
    });
  void data

  return { client_secret: paymentIntent.client_secret as string };
}