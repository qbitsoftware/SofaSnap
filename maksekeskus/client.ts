import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ITransaction, ITransactionResponse } from "./maksekeskus_types";


//apikey = HTTP Basic Authentication using Shop’s ID (as username) and an API authentication key (as password)

// Public key can be used for /v1/tokens - credit card token creation & lookup, /v1/methods - getting payment methods and /v1/shipments/destinations - getting shipment destinations
// Secret Key (currently also known as API key) is used for requests like creating payments, charging cards, etc.
export class MaksekeskusClient {
    private httpClient: AxiosInstance;
    private apiKey: string;

    constructor(apiKey: string, apiBaseUrl: string = 'https://api.test.maksekeskus.ee/v1/') {
        this.apiKey = apiKey
        this.httpClient = axios.create({
            baseURL: apiBaseUrl,
            headers: {
                "Content-Type": 'application/json',
            },
            auth: {
                username: process.env.SHOP_ID!,
                password: this.apiKey
            }
        })

    }

    async createTransaction(transaction: ITransaction): Promise<ITransactionResponse> {
        try {
            const response: AxiosResponse<ITransactionResponse> = await this.httpClient.post('/transactions', transaction)
            return response.data
        } catch (error: any) {
            console.error("something very bad", error.response.data)
            throw error
        }
    }

    async getTransaction(transactionId: string): Promise<ITransactionResponse> {
        try {
            const response: AxiosResponse<ITransactionResponse> = await this.httpClient.get('/transactions/' + transactionId)
            return response.data
        } catch (error: any) {
            console.error("somethign veryverybad", error)
            throw error
        }
    }
}