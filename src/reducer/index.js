import { combineReducers } from 'redux'


const initialState = {}

function userinfo (state = initialState, action) {
    switch (action.type) {
        case 1:
            return action.data
        default:
            return state
    }
}

export default combineReducers({
    userinfo,
})