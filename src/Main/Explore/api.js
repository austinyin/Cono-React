import {get} from 'src/shared/js/axiosUtil.js'

export function getRecommendTweetApi(page, page_size=10) {
    let url = `http://127.0.0.1:8000/api/recommendTweet`;
    let data = {
        page: page,
        page_size: page_size
    };
    return get(url, data)
}

export function getRecommendUserApi() {
    let url = `http://127.0.0.1:8000/api/user/recommend`;
    return get(url)
}


export function snapshotUserGetApi() {
    let url = "http://127.0.0.1:8000/api/user/snapshotList";
    return get(url).then( ret => ret.data)
}
