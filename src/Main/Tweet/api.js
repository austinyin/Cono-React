import {get} from 'src/shared/js/axiosUtil.js'

export function getTweetApi(id) {

    let url = `http://127.0.0.1:8000/api/tweet/${id}`;
    return get(url).then(ret => {
        return ret.data
    })
}