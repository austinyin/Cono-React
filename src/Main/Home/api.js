import {get} from 'src/shared/js/axiosUtil.js'
import {SERVER_ROOT} from "src/shared/api";

export function getHomeTweets(page, page_size=10) {

    let url = `${SERVER_ROOT}/api/tweet`;
    let data = {
        page: page,
        page_size: page_size
    };
    return get(url, data).then(ret => {
        return ret.data
    })
}