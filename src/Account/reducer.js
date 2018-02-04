import * as actionTypes from "./constants";
import {loginState} from "src/Main/Account/constants";

const initialState = {
    user: {},
    state: loginState.logout,
    prompt: ''
};

export default function Account(state = initialState, action) {

    switch (action.type) {
        /**
         * 注册
         */
        case actionTypes.REGIST_SUCCEEDED:
            return Object.assign({}, state, {user: action.data, state: loginState.login});
        case actionTypes.REGIST_FAILED:
            return Object.assign({}, state, {prompt: action.error});

        /**
         * 登陆
         */
        case actionTypes.LOGIN_SUCCEEDED:
            return Object.assign({}, state, {user: action.data, state: loginState.login});
        case actionTypes.LOGIN_FAILED:
            return Object.assign({}, state, {prompt: action.error});

        /**
         * 登出
         */
        case actionTypes.LOGOUT_SUCCEEDED:
            return Object.assign({}, state, {state: loginState.logout});
        case actionTypes.LOGOUT_FAILED:
            return Object.assign({}, state, {prompt: action.error});



        /**
         * 默认
         */

        default:
            return state
    }
}