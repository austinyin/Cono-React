import * as React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { Redirect } from 'react-router-dom';

import * as AccountActions from "./actions";

import {AccountForm,FormType, LoginForm, RegistForm} from "./constants";
import {LoginState} from "src/extra/Account/constants";
import LogInOut from "../../components/LogInOut";
import withRouter from "react-router-dom/es/withRouter";
import {AccountTag} from "src/extra/Account/style";

class Account extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.formTypeSet = this.formTypeSet.bind(this)
        this.accountReceiveFunc = this.accountReceiveFunc.bind(this)
        this.accountForm = Object.assign({},AccountForm)
        this.state = {
            formType: null
        }
    }

    componentDidMount(){
        const path = this.props.match.path
        this.formTypeSet(path)
    }

    componentWillReceiveProps(nextProps){
        const path = nextProps.match.path
        this.formTypeSet(path)
    }

    formTypeSet(path){
        let formType = null
        if(path.includes('login')){
            formType = FormType.login
        }
        if(path.includes('regist')){
            formType = FormType.regist
        }
        this.setState({
            formType
        })
    }
    
    accountReceiveFunc(type, form) {
        if(type===FormType.login) {
            const loginForm = Object.assign({}, LoginForm);
            loginForm.username = form.loginUsername;
            loginForm.password = form.loginPassword;
            this.props.login(loginForm)
        }
        else if(type === FormType.regist) {
            const registForm = Object.assign({}, RegistForm);
            registForm.username = form.registUsername;
            registForm.password = form.registPassword;
            registForm.fullname = form.registFullname;
            if(form.registPhoneOrEmail.includes('@')) {
                registForm.email = form.registPhoneOrEmail;
            } else {
                registForm.phone = form.registPhoneOrEmail;
            }
            this.props.regist(registForm)
        }
    }

    render() {
        if(this.props.account.state === LoginState.login){
            return <Redirect push to={`/user/${this.props.account.user.username}`} />; //如果检测登陆了则重定向.
        }
        return this.state.formType&&(
            <AccountTag id="account" className="container-fluid">
                <div className="row">
                    <div className="account-main col-6 col-md-3">
                        <LogInOut formType={this.state.formType} form={this.accountForm}  accountFunc={this.accountReceiveFunc}/>
                    </div>
                </div>
            </AccountTag>
        )
    }
}

function mapStateToProps(state) {
    return{
        account: state.Account
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(AccountActions.login, dispatch),
        regist: bindActionCreators(AccountActions.regist, dispatch),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Account))