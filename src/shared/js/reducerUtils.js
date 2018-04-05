/**
 * @param state reducer的state
 * @param key 要操作的键名
 * @param operate 该键对应的值要替换的对象
 */
export function stateChildOperByKey(state, key, operate) {
    return Object.assign({}, state, {[key]: Object.assign({}, state[key], operate)})
}

