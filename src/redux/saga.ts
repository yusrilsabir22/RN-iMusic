import { APIResponse, YoutubeAPIResponse, YoutubePlaylist } from './../types';
import { SAVE_YOUTUBE, FETCH_YOUTUBE, SAVE_PLAYLIST, FETCH_PLAYLIST, SET_LOADING } from './types';
import {call, put, takeLatest} from 'redux-saga/effects'
import Service from '../middleware/Service'

function* onFetchYoutube(_action: any) {
    try {
        const res: APIResponse<YoutubeAPIResponse> = yield call(Service.GET, 'youtube');
        // console.log("response", res)
        yield put({type: SAVE_YOUTUBE, payload: res.data});
    } catch (error) {
        console.log(error);
    }
}

function* onFetchPlaylist(action: any) {
    try {
        yield put({type: SET_LOADING})
        const res: APIResponse<YoutubePlaylist> = yield call(Service.GET, `youtube/playlist?list=${action.payload}`);
        yield put({type: SAVE_PLAYLIST, payload: res.data});
    } catch (error) {
        console.log(error);
    }
}

export function* watchYoutube() {
    yield takeLatest(FETCH_YOUTUBE, onFetchYoutube);
    yield takeLatest(FETCH_PLAYLIST, onFetchPlaylist);
}