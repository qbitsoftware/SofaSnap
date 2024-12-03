import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Feature } from "./coordinates-validation";
import { CartItemWithDetails } from "@/utils/supabase/queries/cart";
import { differenceInCalendarDays } from "date-fns";
import { round } from "@/utils/utils";

interface CartTotal {
  price: number,
  fee: number,
  total: number
}

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

export const calculatePrice = (cartItems: CartItemWithDetails[]): CartTotal => {
  const totalPrice = cartItems.reduce((acc, item) => {
    if (item.cart_item.to && item.cart_item.from) {
      const daysDif = differenceInCalendarDays(item.cart_item.to, item.cart_item.from) + 1
      const rentalDays = daysDif | 0;
      return acc + (round(item.product.price * rentalDays));
    } else {
      return acc + (round(item.product.price));
    }
  }, 0);

  return {
    price: totalPrice,
    fee: round(totalPrice * 0.05),
    total: round(totalPrice + (totalPrice * 0.05)),
  }
}

export const validateMAC = async (mac: string, json: JSON) => {
  if (!process.env.SECRET_KEY) {
    console.log("No secret key found");
    return;
  }

  const jsonString = JSON.stringify(json);

  const data = jsonString + process.env.SECRET_KEY;

  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data);

  const hashBuffer = await crypto.subtle.digest("SHA-512", encodedData);

  const hashHexUpperCase = bufferToHex(hashBuffer).toUpperCase();

  if (hashHexUpperCase === mac) {
    console.log("MAC is valid");
  } else {
    console.log("MAC is invalid");
  }
};

function bufferToHex(buffer: ArrayBuffer): string {
  const hexArray = Array.from(new Uint8Array(buffer));
  return hexArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

