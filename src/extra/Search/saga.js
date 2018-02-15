import {takeEvery} from "redux-saga";
import {call, put, select} from 'redux-saga/effects'

import * as SearchActionTypes from "./constants";
import {userSearchGetApi} from "./api";


function* userSearchGetSaga(action) {
    /**
     * 获得当前页，发送请求，再发出SUCCEEDED action
     */
    try {
        const ret = yield call(userSearchGetApi, action.key);
        yield put({type: SearchActionTypes.USER_SEARCH_GET_SUCCEEDED, userList: ret});
    } catch (error) {
        yield put({type: SearchActionTypes.USER_SEARCH_GET_FAILED, error});
    }
}


// 监听搜索

export function* watchUserSearchGet() {
    yield* takeEvery(SearchActionTypes.USER_SEARCH_GET, userSearchGetSaga)
}
