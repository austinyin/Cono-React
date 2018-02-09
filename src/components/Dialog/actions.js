import * as actionTypes from "./constants";



/**
 * 弹窗按钮
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


/**
 * tweet弹窗
 */


// data: number=id
export function tweetFullCardElemSet(data) {
    return{
        type: actionTypes.TWEET_FULL_CARD_ELEM_SET,
        data
    }
}


export function dialogResetAll() {
    return{
        type: actionTypes.DIALOG_RESET_ALL
    }
}

/**
 * pub 发布
 * pubTransferUpload({type:MediaType,data:File})
 */

export function pubTransferUpload(data) {
    return{
        type: actionTypes.PUB_TRANSFER_UPLOAD,
        data
    }
}

export function pubTransferUploadSucceeded(data) {
    return{
        type: actionTypes.PUB_TRANSFER_UPLOAD_SUCCEEDED,
        data
    }
}


export function pubTransferUploadFailed(error) {
    return{
        type: actionTypes.PUB_TRANSFER_UPLOAD_FAILED,
        error
    }
}

export function pubUpload(data) {
    return{
        type: actionTypes.PUB_UPLOAD,
        data
    }
}

export function pubUploadSucceeded(data) {
    return{
        type: actionTypes.PUB_UPLOAD_SUCCEEDED,
        data
    }
}


export function pubUploadFailed(error) {
    return{
        type: actionTypes.PUB_UPLOAD_FAILED,
        error
    }
}





