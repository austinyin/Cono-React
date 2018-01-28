import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter,Route, Redirect, Switch, Match } from 'react-router-dom';
import {Provider} from 'react-redux'

// 全局style
import 'shared/css/index.scss'
import 'bootstrap/scss/bootstrap.scss'

// Main组件
import Main from 'src/Main'

// 根路由
const AppRouter = () => (
    <Switch>
        <Route path="/main" component={Main}/>
    </Switch>

);

// 根组件
const App = () => (
    <AppRouter/>
);

// store初始化
import configureStore from 'store/configureStore.js'
const store = configureStore();

render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);



