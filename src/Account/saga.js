import {call, put, select} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'

import * as AccountActionTypes from './constants'
import {registApi, loginApi, logoutApi, loginCheckApi} from "./api";


function* regist(action) {
    /**
     * 获得当前页，发送请求，再发出SUCCEEDED action
     */
    try {
        const ret = yield call(registApi, action.data);
        yield put({type: AccountActionTypes.REGIST_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: AccountActionTypes.REGIST_FAILED, error});
    }
}

function* login(action) {
    /**
     * 获得当前页，发送请求，再发出SUCCEEDED action
     */
    try {
        const ret = yield call(loginApi, action.data);
        yield put({type: AccountActionTypes.LOGIN_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: AccountActionTypes.LOGIN_FAILED, error});
    }
}

function* logout(action) {
    /**
     * 获得当前页，发送请求，再发出SUCCEEDED action
     */
    try {
        const ret = yield call(logoutApi);
        yield put({type: AccountActionTypes.LOGOUT_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: AccountActionTypes.LOGOUT_FAILED, error});
    }
}


function* loginCheck(action) {
    /**
     * 获得当前页，发送请求，再发出SUCCEEDED action
     */
    try {
        const ret = yield call(loginCheckApi, action.data);
        yield put({type: AccountActionTypes.LOGIN_CHECK_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: AccountActionTypes.LOGIN_CHECK_FAILED, error});
    }
}



/**
 * 注册,登陆,登出,检测
 */
export function* watchRegist() {
    yield* takeEvery(AccountActionTypes.REGIST, regist)
}

export function* watchLogin() {
    yield* takeEvery(AccountActionTypes.LOGIN, login)
}

export function* watchLogout() {
    yield* takeEvery(AccountActionTypes.LOGOUT, logout)
}

export function* watchLoginCheck() {
    yield* takeEvery(AccountActionTypes.LOGIN_CHECK, loginCheck)
}



