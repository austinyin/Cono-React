import {call, put} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'

import * as AccountActionTypes from './constants'
import {loginApi, loginCheckApi, logoutApi, registApi} from "./api";
import {changePasswordApi} from "src/extra/Account/api";


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
     * 登出后利用data中传入的history来跳转路由，这里暂用根据经验值的定时器来跳转路由
     */
    try {
        const ret = yield call(logoutApi);
        setTimeout(() => {
            action.data.history.push("/account/login");
        }, 1000);
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

function* changePasswordSaga(action) {
    try {
        const ret = yield call(changePasswordApi, action.data);
        // 成功则.changePassword返回True。
        if(ret.changePassword){
            action.history.push('/account');
        }
        yield put({type: AccountActionTypes.CHANGE_PASSWORD_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: AccountActionTypes.CHANGE_PASSWORD_FAILED, error});
    }
}


/**
 * 注册,登陆,登出,检测,修改密码
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

export function* watchChangePassword() {
    yield* takeEvery(AccountActionTypes.CHANGE_PASSWORD, changePasswordSaga)
}






