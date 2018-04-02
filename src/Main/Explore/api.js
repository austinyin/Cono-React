import {get} from 'src/shared/js/axiosUtil.js'
import {SERVER_ROOT} from "src/shared/api";

export function getRecommendTweetApi(page, page_size=10) {
    let url = `${SERVER_ROOT}/api/recommendTweet`;
    let data = {
        page: page,
        page_size: page_size
    };
    return get(url, data)
}

export function getRecommendUserApi() {
    let url = `${SERVER_ROOT}/api/user/recommend`;
    return get(url)
}


export function snapshotUserGetApi() {
    let url = `${SERVER_ROOT}/api/user/snapshotList`;
    return get(url).then( ret => ret.data)
}
