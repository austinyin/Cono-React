import {applyMiddleware, createStore} from 'redux'
import rootReducer from '../reducer'
import rootSaga from "src/saga/rootSaga";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';//devToolsEnhancer,


export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [sagaMiddleware]
    const store =  createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(...middlewares)
        )
    );
    sagaMiddleware.run(rootSaga);
    return store;
}

