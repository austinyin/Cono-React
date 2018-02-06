import {get} from 'src/shared/js/axiosUtil.js'

export function getRecommendTweet(page, page_size=10) {
    let url = `http://127.0.0.1:8000/api/recommendTweet`;
    let data = {
        page: page,
        page_size: page_size
    };
    return get(url, data)
}

export function getRecommendUser() {
    let url = `http://127.0.0.1:8000/api/user/recommend`;

    return get(url)
}