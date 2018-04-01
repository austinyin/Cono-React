import {post} from 'src/shared/js/axiosUtil.js'
import {get} from "src/shared/js/axiosUtil";

/**
 * 评论
 */
export function tweetCommentLeaveApi(data) {
    let url = `http://127.0.0.1:8000/api/relation/leaveComment`;
    return post(url, data).then(ret => {
        return ret.data
    })
}

export function tweetCommentRemoveApi(data) {
    let url = `http://127.0.0.1:8000/api/relation/removeComment`;
    return post(url, data).then(ret => {
        return ret.data
    })
}

export function tweetCommentNextPageApi(data) {
    let url = `http://127.0.0.1:8000/api/tweet/${data.tweetId}/comments`;

    return get(url, {page:data.page}).then(ret => {
        return ret.data
    })
}



/**
 * tweetRelation
 */

export function tweetRelationsSetApi(data) {
    let url = "http://127.0.0.1:8000/api/relation/tweet";
    return post(url, data).then(ret => {
        return ret.data
    })
}

/**
 * personRelation
 */

export function personRelationsSetApi(data) {

    let url = "http://127.0.0.1:8000/api/relation/person";
    return post(url, data).then(ret => {
        return ret.data
    })
}

