import { PlayerScreen } from './../types';
import { YoutubeAPIResponse, YoutubePlaylist } from '../types';
import { SAVE_PLAYLIST, SAVE_YOUTUBE, SET_ACTIVE_PLAYLIST, SET_LOADING, SET_PLAYER_SCREEN } from './types';

export interface YoutubeReducerState  {
    data: YoutubeAPIResponse;
    playlist: YoutubePlaylist[];
    active: YoutubePlaylist;
    loading: boolean;
    playlistTitle: string;
    player: PlayerScreen;
}

const defaultState: YoutubeReducerState = {
    data: null,
    playlist: [],
    active: null,
    loading: true,
    playlistTitle: '',
    player: PlayerScreen.show
}

const reducers = (state = defaultState, action) => {
    switch (action.type) {
        case SAVE_YOUTUBE:
            return {
                ...state,
                data: action.payload,
            };
        case SAVE_PLAYLIST:
            return {
                ...state,
                playlist: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        case SET_ACTIVE_PLAYLIST:
            return {
                ...state,
                active: action.payload.data,
                playlistTitle: action.payload.title
            };
        case SET_PLAYER_SCREEN:
            return {
                ...state,
                player: action.payload
            }
        default:
            return state;
    }
}

export default reducers;