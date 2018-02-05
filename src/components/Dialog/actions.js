import * as actionTypes from "./constants";



/**
 * 用户信息获取actions
 */

export function dialogDisplaySet(data) {
    return{
        type: actionTypes.DIALOG_DISPLAY_SET,
        data
    }
}

export function dialogElemsSet(data) {
    return{
        type: actionTypes.DIALOG_ELEMS_SET,
        data
    }
}


export function dialogReset() {
    return{
        type: actionTypes.DIALOG_RESET,

    }
}





