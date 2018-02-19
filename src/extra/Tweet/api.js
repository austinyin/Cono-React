import {get} from 'src/shared/js/axiosUtil.js'

export function getHomeTweets(page, page_size=10) {

    let url = `http://127.0.0.1:8000/api/tweet`;
    let data = {
        page: page,
        page_size: page_size
    };
    return get(url, data).then(ret => {
        return ret.data
    })
}