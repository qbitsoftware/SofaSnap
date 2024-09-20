import { Feature } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
    // console.log(response.status, response.ok, response)

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