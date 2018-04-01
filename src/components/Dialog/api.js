import {get, post} from 'src/shared/js/axiosUtil.js'
import {SERVER_ROOT} from "src/shared/api";

export function getTweetFullCard(id) {
    let url = `${SERVER_ROOT}/api/tweet/${id}`;
    return get(url).then( ret => {
        return ret.data
    })
}


export function transferUploadApi(formData) {
    let url = "http://127.0.0.1:8000/api/upload/transfer";
    const config = {
        headers:{'Content-Type':'multipart/form-data'}
    };
    return post(url, formData,config).then( ret => {
        return ret.data // {shortCode: string, link:string}
    })
}

export function pubTransferImageRemoveApi(id) {
    let url = "http://127.0.0.1:8000/api/upload/transfer/imageRemove";
    const data = {
        id
    };
    return post(url, data).then( ret => {
        return ret.data // {shortCode: string, link:string}
    })
}

export function pubTransferResetApi() {
    let url = "http://127.0.0.1:8000/api/upload/transfer/reset";
    return post(url).then( ret => {
        return ret.data
    }).catch(error => {
        console.log(error)
    })
}


export function pubApi(data) {
    let url = "http://127.0.0.1:8000/api/upload/commit";
    return post(url, data).then( ret => {
        return ret.data
    })
}






