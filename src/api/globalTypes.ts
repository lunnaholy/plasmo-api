export type APIMethod = "GET" | "POST" | "DELETE" | "PATCH";
export interface APIResponse {
    status: true | false,
    error?: {
        msg: string,
        code: number
    },
    data?: {}
}