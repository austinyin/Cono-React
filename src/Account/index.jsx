import { Component } from 'react';
import './style.scss'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


import * as AccountActions from "./actions";

import {AccountForm,FormType, LoginForm, RegistForm} from "./constants";
import LogInOut from "../components/LogInOut";

class Account extends Component {
    constructor(props, context) {
        super(props, context);
        this.accountReceiveFunc = this.accountReceiveFunc.bind(this)
        this.accountForm = Object.assign({},AccountForm)

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
        return (
            <div id="account" className="container">
                <div className="row account-main">
                    <div className="account-left col-6">
                    </div>
                    <div className="account-right logInOut-con col-6">
                        <LogInOut formType={FormType.login} form={this.accountForm}  accountFunc={this.accountReceiveFunc}/>
                    </div>
                </div>

            </div>

        )
    }
}

function mapStateToProps(state) {
    return {}
}


function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(AccountActions.login, dispatch),
        regist: bindActionCreators(AccountActions.regist, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account)