import {get} from "../../shared/js/axiosUtil";
import {SERVER_ROOT} from "src/shared/api";

export function userSearchGetApi(key) {
    let url = `${SERVER_ROOT}/api/user?search=${key}`;
    return get(url).then( ret => ret.data)
}

//
// export function friendsGetApi(key) {
//     let url = `${SERVER_ROOT}/api/user/username/${username}/friends`;
//     return get(url).then( ret => ret.data)
// }
