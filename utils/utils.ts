import { PaymentMethods } from "@/maksekeskus/maksekeskus_types";
import { format } from "date-fns";
import { et } from "date-fns/locale";
import { redirect } from "next/navigation";
import { Card, Banklink } from "@/maksekeskus/maksekeskus_types";

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

export function formatDateEstonia(date: Date | undefined) {
  if (!date) return ''
  return date.toLocaleDateString('et', { year: 'numeric', month: 'numeric', day: 'numeric' })
}

export function round(x: number): number {
  return Math.round(x * 100) / 100
}

export const formatEstonianDate = (date: Date) => {
  return format(date, "d.MMM", { locale: et }).toLowerCase()
}

export function toUTCDate(date: Date | null): Date | null {
  if (!date) return null;
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

type GroupedMethod = {
  name: string;
  displayName: string;
  methods: (Card | Banklink)[];
};

export function groupPaymentMethods(paymentMethods: PaymentMethods): GroupedMethod[] {
  console.log("PaymentMethods", paymentMethods)
  const creditCards: GroupedMethod = {
    name: 'credit_cards',
    displayName: 'Krediitkaart',
    methods: [{
      name: 'visa_mastercard',
      display_name: 'Visa / Mastercard',
      url: '',
      logo_url: '',
      channel: 'card',
      max_amount: 0,
    }],
  };

  const bankLinks: GroupedMethod = {
    name: 'bank_links',
    displayName: 'Pangalink',
    methods: [],
  };

  paymentMethods.cards.forEach(card => {
    if (card.name.toLowerCase().includes('visa') || card.name.toLowerCase().includes('mastercard')) {
      const combinedCard = creditCards.methods[0] as Card;
      if (!combinedCard.url) {
        combinedCard.url = card.url;
      }
      combinedCard.max_amount = Math.max(combinedCard.max_amount, card.max_amount);
    } else {
      bankLinks.methods.push(card);
    }
  });

  paymentMethods.banklinks.forEach(banklink => {
    const existingMethod = bankLinks.methods.find(m => m.url === banklink.url);
    if (!existingMethod) {
      bankLinks.methods.push(banklink);
    }
  });

  return [creditCards, bankLinks].filter(group => group.methods.length > 0);
}