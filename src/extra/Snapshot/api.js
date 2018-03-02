import {get} from "src/shared/js/axiosUtil";

export function getSnapshotsApi(username) {
    let url = `http://127.0.0.1:8000/api/user/username/${username}/snapshots`
    return get(url).then(ret => ret.data)
}
