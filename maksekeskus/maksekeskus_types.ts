export interface ITransaction {
    transaction: Transaction
    customer: Customer
    app_info: AppInfo
}

export interface Customer {
    customer_email: string
    ip: string
    country?: string
    locale?: string
}

export interface Transaction {
    amount: string
    currency: string
    reference?: string
    merchant_data?: string
    recurring_required?: boolean
}

export interface AppInfo {
    module?: string
    module_version?: string
    platform: string
    platform_version?: string
}

export interface ITransactionResponse {
    _links: TransactionLinks;
    amount: number;
    channel: string | null;
    country: string;
    created_at: string;
    currency: string;
    customer: CustomerResponse;
    id: string;
    method: string | null;
    object: string;
    payment_methods: PaymentMethods;
    recurring_required: boolean;
    reference: string;
    status: string;
    type: string | null;
}

interface TransactionLinks {
    Pay: Link;
    self: Link;
}

interface Link {
    href: string;
}

interface CustomerResponse {
    country?: string;
    created_at: string;
    email: string;
    id: string;
    ip: string;
    ip_country: string;
    locale?: string;
    name: string;
    object: string;
}

export interface PaymentMethods {
    banklinks: Banklink[];
    cards: Card[];
    other: OtherMethod[];
    payLater: PayLater[];
}

interface Banklink {
    channel: string;
    countries: string[];
    country: string;
    display_name: string;
    logo_url: string;
    max_amount: number;
    name: string;
    url: string;
}

interface Card {
    channel: string;
    display_name: string;
    logo_url: string;
    max_amount: number;
    name: string;
    url: string;
}

interface OtherMethod {
    name: string;
    url: string;
    channel?: string;
    countries?: string[];
    country?: string;
    display_name?: string;
    logo_url?: string;
    max_amount?: number;
}

interface PayLater {
    channel: string;
    countries: string[];
    country: string;
    display_name: string;
    logo_url: string;
    max_amount: number;
    min_amount: number;
    name: string;
    url: string;
}
