import { APIResponse } from "../api/globalTypes";

export interface ProfileAPIResponse extends APIResponse {
    data?: {
        id: number,
        discord_id: bigint,
        nick: string,
        uuid: string,
        banned: boolean,
        ban_reason?: string,
        fusion: number,
        on_server: boolean,
        roles: Role[],
        characters: null | Character[],
        warns: null | Warn[],
        marks: null | [],
        teams: null | Team[],
        stats?: Stats,
        heatmap?: HeatMapDay[],
        skin_format: "slim" | "classic"
    }
}

export type Field = "marx" | "character" | "warns" | "teams" | "stats" | "skin_format";

export enum Role {
    "player",
    "support",
    "poppy",
    "dandelion",
    "admin",
    "helper",
    "soviet-helper",
    "banker",
    "default",
    "supa_helper",
    "booster",
    "president",
    "mko-helper"
}

export interface Character {
    id: number,
    name: string,
    role: string,
    description: string
}

export interface Warn {
    message: string,
    force: boolean,
    revoked: boolean,
    helper: string,
    date: number
}

export interface Team {
    id: number,
    name: string,
    description: string,
    banner: string,
    discord: string,
    recruit: boolean,
    members: number,
    owner: string,
    marx: number
}

export interface Mark {
    id: number,
    name: string, 
    description: string,
    owner: string,
    x: number,
    z: number,
    branch: {
        color: "red" | "blue" | "green" | "yellow",
        direction: "left" | "right",
        offset: number
    },
    world: "overworld" | "farmworld"
}

export interface HeatMapDay {
    date: string,
    player: number
}

export interface Stats {
    all: number,
    month: number,
    week: number,
    yesterday: number,
    today: number,
    on_site: boolean,
    last_seen: number,
    web_last_seen: number
}