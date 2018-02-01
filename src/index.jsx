import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Match, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux'
// 全局style
import 'assets/css/index.scss'
import 'bootstrap/scss/bootstrap.scss'
import createSagaMiddleware from 'redux-saga';
// Main组件
import Main from 'src/Main'
import 'babel-polyfill'
import 'regenerator-runtime/runtime'
import rootSaga from "src/saga/rootSaga";
import configureStore from "src/store/configureStore";

// 根路由
const AppRouter = () => (
    <Switch>
        <Route component={Main}/>
    </Switch>

);

// 根组件
const App = () => (
    <AppRouter/>
);

const sagaMiddleware = createSagaMiddleware()
const store = configureStore(sagaMiddleware, rootSaga)


render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);



