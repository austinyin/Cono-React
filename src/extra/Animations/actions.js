import * as actionTypes from "./constants";

/**
 *
 * @param loading boolean
 */
export function loadingSet(loading) {
    return{
        type: actionTypes.LOADING_SET,
        loading
    }
}