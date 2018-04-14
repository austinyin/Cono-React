import {call, put} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import * as DialogActionTypes from './constants'
import {getTweetFullCard} from "./api";
import {pubApi, pubTransferImageRemoveApi, pubTransferResetApi, transferUploadApi} from "src/components/Dialog/api";


function* tweetFullCardElemSet(action) {
    /**
     *
     */
    try {
        const ret = yield call(getTweetFullCard, action.data); // action.data 为 id。
        yield put({type: DialogActionTypes.TWEET_FULL_CARD_ELEM_SET_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: DialogActionTypes.TWEET_FULL_CARD_ELEM_SET_FAILED, error});
    }
}


function* pubTransferUpload(action) {
    /**
     * data为formData{file:fileData}
     */
    try {
        const ret = yield call(transferUploadApi, action.data);
        yield put({type: DialogActionTypes.PUB_TRANSFER_UPLOAD_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: DialogActionTypes.PUB_TRANSFER_UPLOAD_FAILED, error});
    }
}

function* PubTransferImageRemoveSaga(action) {
    /**
     * data为formData{id:number}
     */
    try {
        const ret = yield call(pubTransferImageRemoveApi, action.id);
        yield put({type: DialogActionTypes.PUB_TRANSFER_IMAGE_REMOVE_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: DialogActionTypes.PUB_TRANSFER_IMAGE_REMOVE_FAILED, error});
    }
}

function* pubTransferResetSaga(action) {
    try {
        const ret = yield call(pubTransferResetApi, action.id);
        if(!ret.transferReset){
            throw new Error(ret.msg)
        }
        yield put({type: DialogActionTypes.PUB_TRANSFER_RESET_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: DialogActionTypes.PUB_TRANSFER_RESET_FAILED, error});
    }
}

function* pubUpload(action) {
    try {
        const ret = yield call(pubApi, action.data);
        yield put({type: DialogActionTypes.PUB_UPLOAD_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: DialogActionTypes.PUB_UPLOAD_FAILED, error});
    }
}



function* dialogResetAllSaga() {
    try {
        yield put({type: DialogActionTypes.PUB_TRANSFER_RESET});
        yield put({type: DialogActionTypes.DIALOG_RESET_ALL_SUCCEEDED});
    } catch (error) {
        yield put({type: DialogActionTypes.DIALOG_RESET_ALL_FAILED, error});
    }
}




// 监听tweet卡片设置action
export function* watchTweetFullCardElemSet() {
    yield* takeEvery(DialogActionTypes.TWEET_FULL_CARD_ELEM_SET, tweetFullCardElemSet)
}

// 监听发布中转 PUB_TRANSFER_UPLOAD action
export function* watchPubTransferUpload() {
    yield* takeEvery(DialogActionTypes.PUB_TRANSFER_UPLOAD, pubTransferUpload)
}

/**
 * 监听发布中转 PUB_TRANSFER_UPLOAD action
 */
export function* watchPubTransferImageRemove() {
    yield* takeEvery(DialogActionTypes.PUB_TRANSFER_IMAGE_REMOVE, PubTransferImageRemoveSaga)
}


export function* watchPubTransferReset() {
    yield* takeEvery(DialogActionTypes.PUB_TRANSFER_RESET, pubTransferResetSaga)
}

/**
 * 监听发布action
 */
export function* watchPubUpload() {
    yield* takeEvery(DialogActionTypes.PUB_UPLOAD, pubUpload)
}

/**
 * 清除所有dialog状态
 * 这里加入了 pubTransferReset action.
 */
export function* watchDialogResetAll() {
    yield* takeEvery(DialogActionTypes.DIALOG_RESET_ALL, dialogResetAllSaga)
}







