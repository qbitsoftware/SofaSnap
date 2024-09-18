import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//use user_id as session token
export const fetchSuggestions = async (search_input: string, session_token: string, for_map: boolean = false) => {
  const suggestUrl = "https://api.mapbox.com/search/searchbox/v1/suggest?"

  const params = {
    q: search_input,
    access_token: process.env.MAPBOX_KEY!,
    session_token,
    limit: "3",
    country: "EE",
    language: "et",
    types: for_map ? "place,locality,address,postcode,neighborhood" : "address"
  };

  const queryParams = new URLSearchParams(params);

  if (search_input.length < 3) return []
  try {
    const response = await fetch(suggestUrl + queryParams, {
      method: "GET"
    })
    console.log(response.status, response.ok, response)

    const json = await response.json()
    if (response.ok !== true || response.status !== 200) return []
    const suggestions = json.suggestions
    console.log("Suggestions", suggestions)
    if (!suggestions) return []
    return suggestions

  } catch (err) {
    console.error(err)
    return []
  }
}
