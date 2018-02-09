import * as actionTypes from "./constants";
import {stateChildOperByKey} from "src/shared/js/reducerUtils";
import {UploadState, UploadType} from "src/components/Dialog/constants";

const initialState = {
    dialogButtons: {visible: false, elems: []},
    pubCard: {visible: false, state: UploadState.before, transferObj: null},
    tweetFullCard: {visible: false, data: {}}
};

export default function Dialog(state = initialState, action) {

    switch (action.type) {
        /**
         * 全局显示设置
         */
        case actionTypes.DIALOG_DISPLAY_SET:
            var newState = {};
            for(let key in action.data){
                if(state.hasOwnProperty(key)){
                    // action.data 类型为 {key: boolean}, 通过遍历为其设置隐藏或显示。
                    newState = stateChildOperByKey(state, key, {visible: action.data[key]})
                }
            }
            return newState;
        case actionTypes.DIALOG_BUTTONS_ELEM_SET:
            return stateChildOperByKey(state, 'dialogButtons', {elems: action.data})

        /**
         *  tweetFullCard设置
         */
        case actionTypes.TWEET_FULL_CARD_ELEM_SET_SUCCEEDED:
            return stateChildOperByKey(state, 'tweetFullCard', {data: action.data})

        /**
         *  transfer设置
         */
        case actionTypes.PUB_TRANSFER_UPLOAD_SUCCEEDED:
            console.log('action.data.transferObj',action.data.transferObj)
            return stateChildOperByKey(state, 'pubCard', {transferObj: action.data.transferObj,state: UploadState.going})
        case actionTypes.PUB_UPLOAD_SUCCEEDED:
            return stateChildOperByKey(state, 'pubCard', {state: UploadState.before})

        /**
         * reset和default
         */
        case actionTypes.DIALOG_RESET_ALL:
            return initialState;
        default:
            return state;
    }
}