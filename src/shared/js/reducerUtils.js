export function stateChildOperByKey(state, key, operate) {
    return Object.assign({}, state, {[key]: Object.assign({}, state[key], operate)})
}

