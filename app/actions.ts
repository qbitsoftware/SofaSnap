"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
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
import { ContactEmailTemplateData } from "@/lib/email-templates";


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

  return redirect("/");
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

export async function sendEmailAction(to: string, sub: string, content: string){
  try {
   await sendEmail(to, sub, content)
  } catch (error) {
    console.error(error)
  }
}

export async function  deleteProductAction(product_id: number): Promise<{ data: string | undefined, error: string | undefined }> {
    return await deleteProduct(product_id)
}

interface ContactEmailData {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  message: string;
  productId: number;
  productName: string;
  ownerUserId: string;
}

export async function sendContactEmailAction(data: ContactEmailData): Promise<{ success: boolean; error?: string }> {
  try {
    // Get owner email from Supabase auth using service role
    const supabase = createClient();
    
    // Try to get user details - this requires SUPABASE_SERVICE_ROLE_KEY in env
    // You need to add SUPABASE_SERVICE_ROLE_KEY and RESEND_API_KEY to your .env.local file
    try {
      const { data: userData, error: userError } = await supabase.auth.admin.getUserById(data.ownerUserId);
      
      if (userError || !userData.user?.email) {
        // Fallback to basic notification email to admin
        console.warn('Could not get owner email, falling back to admin notification');
        await sendEmail(
          'seatly@seatly.com', // Admin email
          `Päring kuulutuse "${data.productName}" kohta`,
          `
            <h2>Uus kontakti taotlus</h2>
            <p><strong>Kuulutus:</strong> ${data.productName} (ID: ${data.productId})</p>
            <p><strong>Omaniku ID:</strong> ${data.ownerUserId}</p>
            <hr>
            <p><strong>Saatja:</strong> ${data.senderName}</p>
            <p><strong>E-post:</strong> ${data.senderEmail}</p>
            <p><strong>Telefon:</strong> ${data.senderPhone}</p>
            <p><strong>Sõnum:</strong></p>
            <p>${data.message}</p>
          `
        );
        return { success: true };
      }

      const ownerEmail = userData.user.email;
      const ownerName = userData.user.user_metadata?.firstName || userData.user.user_metadata?.name || 'Kuulutuse omanik';

      // const emailSubject = generateContactEmailSubject(data.productName, data.senderName);
      const emailSubject = ""
      const emailTemplateData: ContactEmailTemplateData = {
        ...data,
        ownerEmail,
        ownerName
      };
      // const emailHtml = generateContactEmailTemplate(emailTemplateData);
      const emailHtml = ""

      // const result = await resend.emails.send({
      //   from: 'Seatly <noreply@seatly.com>',
      //   to: [ownerEmail],
      //   subject: emailSubject,
      //   html: emailHtml,
      //   replyTo: data.senderEmail,
      // });

      // if (result.error) {
      //   console.error('Resend error:', result.error);
      //   return { success: false, error: 'Email saatmine ebaõnnestus' };
      // }

      return { success: true };
      
    } catch (authError) {
      console.warn('Service role not configured, falling back to nodemailer');
      
      // Fallback to existing email system
      await sendEmail(
        'seatly@seatly.com', // Send to admin for now
        `Päring kuulutuse "${data.productName}" kohta kasutajalt ${data.senderName}`,
        `
          <h2>Uus kontakti taotlus</h2>
          <p><strong>Kuulutus:</strong> ${data.productName} (ID: ${data.productId})</p>
          <p><strong>Omaniku ID:</strong> ${data.ownerUserId}</p>
          <hr>
          <p><strong>Saatja:</strong> ${data.senderName}</p>
          <p><strong>E-post:</strong> ${data.senderEmail}</p>
          <p><strong>Telefon:</strong> ${data.senderPhone}</p>
          <p><strong>Sõnum:</strong></p>
          <p style="white-space: pre-wrap;">${data.message}</p>
          <hr>
          <p><em>Palun edasta see sõnum kuulutuse omanikule käsitsi või seadista SUPABASE_SERVICE_ROLE_KEY keskkonnmuutuja automaatseks edastamiseks.</em></p>
        `
      );
      
      return { success: true };
    }
    
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error: 'Tehnilised probleemid e-posti saatmisel' };
  }
}