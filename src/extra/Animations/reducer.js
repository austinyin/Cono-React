import * as actionTypes from "./constants";

const initialState = {
    effcts: {
        loading: false
    },
    isAnimating: false
};

export function animatingVerify(state) {
    return Object.keys(state).some(key => key===true)
}

export default function Animations(state = initialState, action) {
    switch (action.type) {
        /**
         * 加载动画
         */
        case actionTypes.LOADING_SET:
            var newState = Object.assign({},state)
            newState.effcts.loading = action.loading
            newState.isAnimating = animatingVerify(newState)
            return newState

        /**
         *
         */
        default:
            return state
    }
}