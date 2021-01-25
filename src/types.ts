import { MainScreenNavigationProp, MainScreenRouteProps } from './config/navigation';
export type GlobalProps = {
    navigation: MainScreenNavigationProp;
    route: MainScreenRouteProps;
}

export type ListPlaylist = {
    title: string;
    thumbnail: string;
    playlistId: string;
}

/**
 * Method GET
 * Response from http://music.blondev.my.id/youtube
 */
export interface YoutubeAPIResponse {
    cardTitle: string
    items: ListPlaylist[]
}

/**
 * @description Method GET
 * @see http://music.blondev.my.id/playlist?list=$list_playlist
 * @see http://music.blondev.my.id/search?q=$query_search
 */
export type YoutubePlaylist = {
    title: string;
    owner: string;
    videoId: string;
    durationText: string;
    durationNumber: number;
    thumbnail: string;
}

export interface APIResponse<T> {
    data: T;
    status: number
}

export enum PlayerScreen {
    show = 'SHOW',
    hide = 'HIDE',
    full = 'FULL'
}

