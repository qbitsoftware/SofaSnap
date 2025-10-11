import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Feature } from "./coordinates-validation";
import { generateContactEmailSubject, generateContactEmailTemplate, generateInvoiceSubject, generateInvoiceTemplate, generateSignupSubject, generateSignupTemplate, InvoiceEmailTemplateData } from "./email-templates";
import { ContactEmailData, EmailContent, OwnerInfo } from "@/types/email";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//use user_id as session token
export const fetchSuggestions = async (search_input: string, session_token: string) => {
  const suggestUrl = "https://api.mapbox.com/search/searchbox/v1/suggest?"

  const params = {
    q: search_input,
    access_token: process.env.MAPBOX_KEY!,
    session_token,
    limit: "3",
    country: "EE",
    language: "et",
    types: "address",
  };

  const queryParams = new URLSearchParams(params);

  if (search_input.length < 3) return []
  try {
    const response = await fetch(suggestUrl + queryParams, {
      method: "GET"
    })

    const json = await response.json()
    if (response.ok !== true || response.status !== 200) return []
    const suggestions = json.suggestions
    if (!suggestions) return []
    return suggestions

  } catch (err) {
    console.error(err)
    return []
  }
}

export const fetchCoordinates = async (mapbox_id: string, session_token: string) => {
  const coordinateUrl = `https://api.mapbox.com/search/searchbox/v1/retrieve/${mapbox_id}?`

  const params = {
    access_token: process.env.MAPBOX_KEY!,
    session_token,
  }


  const queryParams = new URLSearchParams(params);

  try {
    const response = await fetch(coordinateUrl + queryParams, {
      method: "GET"
    })

    const json = await response.json()
    if (response.ok !== true || response.status !== 200) return []
    const feature = json.features as Feature
    if (!feature) return []
    return feature

  } catch (err) {
    console.error(err)
    return []
  }
}

// export const calculatePrice = (cartItems: CartItemWithDetails[]): CartTotal => {
//   const totalPrice = cartItems.reduce((acc, item) => {
//     if (item.cart_item.to && item.cart_item.from) {
//       const daysDif = differenceInCalendarDays(item.cart_item.to, item.cart_item.from) + 1
//       const rentalDays = daysDif | 0;
//       return acc + (round(item.product.price * rentalDays));
//     } else {
//       return acc + (round(item.product.price));
//     }
//   }, 0);

//   return {
//     price: totalPrice,
//     fee: round(totalPrice * 0.15),
//     total: round(totalPrice + (totalPrice * 0.15)),
//   }
// }

// export const validateMAC = async (mac: string, json: Notification) => {
//   if (!process.env.SECRET_KEY) {
//     return;
//   }

//   const jsonString = JSON.stringify(json);

//   const data = jsonString + process.env.SECRET_KEY;

//   const encoder = new TextEncoder();
//   const encodedData = encoder.encode(data);

//   const hashBuffer = await crypto.subtle.digest("SHA-512", encodedData);

//   const hashHexUpperCase = bufferToHex(hashBuffer).toUpperCase();

//   if (hashHexUpperCase === mac) {
//     return true
//   } else {
//     return false
//   }
// };

// function bufferToHex(buffer: ArrayBuffer): string {
//   const hexArray = Array.from(new Uint8Array(buffer));
//   return hexArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
// }

export function prepareEmailContent(
  data: ContactEmailData,
  owner: OwnerInfo
): EmailContent {
  const senderName = data.senderName || 'Huvitatud isik';

  return {
    subject: generateContactEmailSubject(data.productName, senderName),
    html: generateContactEmailTemplate({
      ...data,
      senderName,
      senderPhone: data.senderPhone || "",
      ownerEmail: owner.email,
      ownerName: owner.name,
    }),
  };
}

export function prepareSignupEmail(
  email: string,
  name: string
): EmailContent {
  return {
    subject: generateSignupSubject(),
    html: generateSignupTemplate(email, name)
  };
}

export function prepareInvoiceEmail(
  data: InvoiceEmailTemplateData
): EmailContent {
  return {
    subject: generateInvoiceSubject(data.invoiceNumber),
    html: generateInvoiceTemplate(data)
  }
}
