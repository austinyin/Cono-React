import {get} from 'src/shared/js/axiosUtil.js'
import {SERVER_ROOT} from "src/shared/api";

export function getTweetApi(id) {

    let url = `${SERVER_ROOT}/api/tweet/${id}`;
    return get(url).then(ret => {
        return ret.data
    })
}