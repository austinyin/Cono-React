import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Match, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux'

// 全局style
import 'assets/css/index.scss'
import 'bootstrap/scss/bootstrap.scss'

// Main组件
import Main from 'src/Main'
import Account from "src/Account";


// redux-saga 环境
import 'babel-polyfill'
import 'regenerator-runtime/runtime'

// 根路由
const AppRouter = () => (
    <Switch>
        <Route exact path='/account' component={Account} />
        <Route component={Main}/>
    </Switch>

);

// 根组件
const App = () => (
    <AppRouter/>
);

// // store初始化
import configureStore from "src/store/configureStore";
const store = configureStore()





render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);



