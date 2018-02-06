import * as actionTypes from "./constants";
import {LoginState} from "./constants";

const initialState = {
    user: {},
    state: LoginState.logout,
    prompt: ''
};

export default function Account(state = initialState, action) {

    switch (action.type) {
        /**
         * 注册
         */
        case actionTypes.REGIST_SUCCEEDED:
            return Object.assign({}, state, {user: action.data.user, state: LoginState.login});

        /**
         * 登陆
         */
        case actionTypes.LOGIN_SUCCEEDED:
            return Object.assign({}, state, {user: action.data.user, state: LoginState.login});

        /**
         * 登出
         */
        case actionTypes.LOGOUT_SUCCEEDED:
            return Object.assign({}, state, {state: LoginState.logout});

        /**
         * 检测
         */
        case actionTypes.LOGIN_CHECK_SUCCEEDED:
            return Object.assign({}, state, {user: action.data.user,state: LoginState.login});

        /**
         * 默认和错误判断
         */
        case actionTypes.REGIST_FAILED || actionTypes.LOGIN_FAILED || actionTypes.LOGOUT_FAILED || actionTypes.LOGIN_CHECK_FAILED:
            return Object.assign({}, state, {prompt: action.error});

        default:
            return state
    }
}