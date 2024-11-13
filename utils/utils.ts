import { format } from "date-fns";
import { et } from "date-fns/locale";
import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function capitalize(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}

export function formatDate(date: Date | undefined) {
  if (!date) return ''
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function round(x: number):number {
  return Math.round(x * 100) / 100
}

export const formatEstonianDate = (date: Date) => {
  return format(date, "d.MMM", { locale: et }).toLowerCase()
}

export function toUTCDate(date: Date | null): Date | null {
  if (!date) return null;
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}
