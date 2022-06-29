import { APIResponse } from '../api/globalTypes';
import { Notification } from '../notifications/typings';
import { Mark } from '../marx/typings';
import { Warn } from '../warns/typings';
import { Team } from '../teams/typings';

export interface ProfileAPIResponse extends APIResponse {
  data?: {
    id: number;
    discord_id: bigint;
    nick: string;
    uuid: string;
    banned: boolean;
    ban_reason?: string;
    fusion: number;
    on_server: boolean;
    roles: Role[];
    characters: null | [];
    warns: null | Warn[];
    marks: null | Mark[];
    teams: null | Team[];
    stats?: Stats;
    heatmap?: HeatMapDay[];
    skin_format?: 'slim' | 'classic';
    notifications?: Notification[];
    unread?: number[];
  };
}

export type Field = 'marx' | 'character' | 'warns' | 'teams' | 'stats' | 'skin_format';

export enum Role {
  'player',
  'support',
  'poppy',
  'dandelion',
  'admin',
  'helper',
  'soviet-helper',
  'banker',
  'default',
  'supa_helper',
  'booster',
  'president',
  'mko-helper',
}

export interface HeatMapDay {
  date: string;
  player: number;
}

export interface Stats {
  all: number;
  month: number;
  week: number;
  yesterday: number;
  today: number;
  on_site: boolean;
  last_seen: number;
  web_last_seen: number;
}
