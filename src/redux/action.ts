import { FETCH_YOUTUBE, FETCH_SEARCH, FETCH_PLAYLIST } from './types';

export const fetchYoutube = () => {
    return {
        type: FETCH_YOUTUBE,
    }
}

/**
 * 
 * @param payload is id_playlist
 */
export const fetchPlaylist = (payload) => {
    return {
        type: FETCH_PLAYLIST,
        payload,
    }
}

/**
 * 
 * @param payload is query_search
 */
export const fetchSearch = (payload) => {
    return {
        type: FETCH_SEARCH,
        payload,
    }
}

