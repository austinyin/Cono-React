import {get} from "../../shared/js/axiosUtil";

export function userSearchGetApi(key) {
    let url = `http://127.0.0.1:8000/api/user?search=${key}`;
    return get(url).then( ret => ret.data)
}

//
// export function friendsGetApi(key) {
//     let url = `http://127.0.0.1:8000/api/user/username/${username}/friends`;
//     return get(url).then( ret => ret.data)
// }
