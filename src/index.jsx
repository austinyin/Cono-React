import  React,{Component}  from 'react'
import {render} from 'react-dom';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';

import {connect, Provider} from 'react-redux'
import { CookiesProvider } from 'react-cookie';

// 全局style
import 'src/shared/assets/css/index.scss'
import 'src/shared/assets/css/bootstrap-grid.css'

// 引入组件
import Main from './Main'
import Account from "./extra/Account/index";
import Snapshot from "src/extra/Snapshot";


// redux-saga 环境
import 'babel-polyfill'
import 'regenerator-runtime/runtime'

// store初始化
import configureStore from "./store/configureStore";
import {bindActionCreators} from "redux";
import {loginCheck} from "./extra/Account/actions";
export const store = configureStore()




// 根路由
const AppRouter = () => (
    <Switch>
        <Route exact path='/account/login' component={Account} />
        <Route exact path='/account/regist' component={Account} />
        <Route path='/snapshot/:user' component={Snapshot}/>
        <Route path='/' component={Main}/>
    </Switch>
);

// 根组件
class App extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        // 启动时进行登陆检查
        this.props.loginCheck()
    }

    render() {
        return <AppRouter/>
    }
}


function mapDispatchToProps(dispatch) {
    return {
        loginCheck: bindActionCreators(loginCheck, dispatch),
    }
}


App = withRouter(connect(
    null,
    mapDispatchToProps
)(App));



render(
    <Provider store={store}>
        <CookiesProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </CookiesProvider>
    </Provider>,
    document.getElementById('root')
);



