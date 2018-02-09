import {get, post} from 'src/shared/js/axiosUtil.js'

export function getTweetFullCard(id) {
    let url = `http://127.0.0.1:8000/api/tweet/${id}`;
    return get(url).then( ret => {
        return ret.data
    })
}


export function pubTransferApi(formData) {
    let url = "http://127.0.0.1:8000/api/upload/tranfer";
    const config = {
        headers:{'Content-Type':'multipart/form-data'}
    };
    return post(url, formData,config).then( ret => {
        return ret.data // {shortCode: string, link:string}
    })
}

export function pubApi(data) {
    let url = "http://127.0.0.1:8000/api/upload/commit";
    return post(url, data).then( ret => {
        return ret.data
    })
}

