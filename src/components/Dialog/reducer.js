import * as actionTypes from "./constants";

const initialState = {
    dialogButtons: {visible: false, elems: []},
    pubCard: {visible: false, state: null},
    tweetFullCard: {visible: false, data: {}}
};

export default function Dialog(state = initialState, action) {

    switch (action.type) {
        /**
         * 全局显示设置
         */
        case actionTypes.DIALOG_DISPLAY_SET:
            var newState = {}
            for(let key in action.data){
                if(state.hasOwnProperty(key)){
                    // action.data 类型为 {key: boolean}, 通过遍历为其设置隐藏或显示。

                    newState = Object.assign({},state,{[key]:Object.assign({},state[key],{visible: action.data[key]})})
                }
            }
            return newState
        case actionTypes.DIALOG_BUTTONS_ELEM_SET:
            console.log('elems', action.data)
            console.log('first', Object.assign({}, state['dialogButtons'], {elems: action.data}))
            console.log(Object.assign({}, state, {'dialogButtons': Object.assign({}, state['dialogButtons'], {elems: action.data})}))
            return Object.assign({}, state, {'dialogButtons': Object.assign({}, state['dialogButtons'], {elems: action.data})})

        /**
         *  tweetFullCard设置
         */
        case actionTypes.TWEET_FULL_CARD_ELEM_SET_SUCCEEDED:
            return Object.assign({}, state, {'tweetFullCard':Object.assign({}, state['tweetFullCard'], {data: action.data})})

        /**
         * reset和default
         */
        case actionTypes.DIALOG_RESET_ALL:
            return initialState;
        default:
            return state;
    }
}