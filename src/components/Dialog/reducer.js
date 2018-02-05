import * as actionTypes from "./constants";

const initialState = {
    visible: false,
    dialogElems: [],
};

export default function Dialog(state = initialState, action) {

    switch (action.type) {
        /**
         * 用户信息
         */
        case actionTypes.DIALOG_DISPLAY_SET:
            return Object.assign({}, state, {visible: action.data}); // action.data is true or false
        case actionTypes.DIALOG_ELEMS_SET:
            return Object.assign({}, state, {dialogElems: action.data});

        /**
         * reset和default
         */
        case actionTypes.DIALOG_RESET:
            return initialState;
        default:
            return state;
    }
}