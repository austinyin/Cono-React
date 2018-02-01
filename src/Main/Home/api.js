import {get} from 'src/shared/js/axiosUtil.js'

export function getHomeTweets(page,page_size) {
    let url = 'http://127.0.0.1:8000/api/tweet';
    // let data = {
    //     page: page,
    //     page_size: page_size
    // };
    // return get(url, data)
    return get(url)
}