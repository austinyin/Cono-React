import React,{Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Match, Route, Switch} from 'react-router-dom';
import {connect, Provider} from 'react-redux'

// 全局style
import 'assets/css/index.scss'
import 'bootstrap/scss/bootstrap.scss'
// Main组件
import Main from './Main'
import Account from "./Account/index";
// redux-saga 环境
import 'babel-polyfill'
import 'regenerator-runtime/runtime'
// store初始化
import configureStore from "./store/configureStore";


// // tsx 去除 global错误。
// import * as ReactObj from "react";
// import * as ReactDOMObj from "react-dom";
// declare global {
//     const React: typeof ReactObj;
//     const ReactDOM: typeof ReactDOMObj;
// }

// 根路由
const AppRouter = () => (
    <Switch>
        <Route exact path='/account' component={Account} />
        <Route component={Main}/>
    </Switch>
);

// 根组件
class App extends Component {
    constructor(props){
        super(props);
        this.init = this.init.bind(this)
    }

    init(){

    }

    componentDidMount() {
        this.init()
    }

    render() {
        return <AppRouter/>
    }
}


function mapDispatchToProps(dispatch) {
    return {
    }
}

const RootApp = connect(
    null,
    mapDispatchToProps
)(App);


const store = configureStore()

render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                hha
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);



