import { APIResponse } from "../api/globalTypes"

export interface Notification {
    id: number,
    user_id: number,
    date: number,
    read: number,
    type: string,
    data: {}
}

export interface NotificationsAPIResponse extends APIResponse {
    data?: Notification[]
}