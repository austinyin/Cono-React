import {get} from "src/shared/js/axiosUtil";
import {SERVER_ROOT} from "src/shared/api";

export function getSnapshotsApi(username) {
    let url = `${SERVER_ROOT}/api/user/username/${username}/snapshots`
    return get(url).then(ret => ret.data)
}
