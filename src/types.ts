import { RootScreenNavigationProp, RootScreenRouteProps } from './config/navigation';
export type GlobalProps = {
    navigation: RootScreenNavigationProp;
    route: RootScreenRouteProps;
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