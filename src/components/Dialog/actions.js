import * as actionTypes from "./constants";



/**
 * 用户信息获取actions
 */

// data: {key: value:boolean}
export function dialogDisplaySet(data) {
    return{
        type: actionTypes.DIALOG_DISPLAY_SET,
        data
    }
}

// data: elem[]
export function dialogButtonsElemSet(data) {
    return{
        type: actionTypes.DIALOG_BUTTONS_ELEM_SET,
        data
    }
}

// data: number=id
export function tweetFullCardElemSet(data) {
    return{
        type: actionTypes.TWEET_FULL_CARD_ELEM_SET,
        data
    }
}


export function dialogResetAll() {
    return{
        type: actionTypes.DIALOG_RESET_ALL,

    }
}





