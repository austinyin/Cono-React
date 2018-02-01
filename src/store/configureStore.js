import {applyMiddleware, createStore} from 'redux'
import rootReducer from '../reducer'
import rootSaga from "src/saga/rootSaga";


export default function configureStore(sagaMiddleware, rootSaga) {
    const store =  createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware),
        // 触发 redux-devtools
        window.devToolsExtension ? window.devToolsExtension() : undefined
    )
    sagaMiddleware.run(rootSaga);
    return store;
}

