import React, {Component} from 'react'
import './style.scss'
import {AccountForm, FormType, formType, loginType} from "src/extra/Account/constants";
import {Link} from "react-router-dom";
import {CommonFormWrapperTag, LogInOutTag} from "src/components/LogInOut/style";
import {IconTypeToPosition, PositionIconTag} from "src/shared/styleJs/common/IconsStyle";

class LogInOut extends Component {
    constructor(props) {
        super(props);
        this.formReset = this.formReset.bind(this)
        this.logInOutHandle = this.logInOutHandle.bind(this)
        this.valueChangeHandle = this.valueChangeHandle.bind(this)
        this.setFormState = this.setFormState.bind(this)
        this.valueChangeTimers = {}; // 包含输入框函数节流定时器。
        this.canSubmits = {};  // 包含所有输入框是否可以提交状态
        this.state = {
            form: AccountForm,
        }
    }



    /**
     * 没有设置完state之前不能进行表单提交
     * setState回调表示可以提交表单了。
     * 并包含了函数节流逻辑。
     */
    valueChangeHandle(e) {
        const targetId = e.target.id;
        const targetValue = e.target.value;
        this.canSubmits[targetId] = false;

        clearTimeout(this.valueChangeTimers[targetId]);
        this.valueChangeTimers[targetId] = setTimeout(() => {
            this.setFormState(targetId, targetValue)
        }, 2000)

    }

    logInOutHandle(e) {
        e.preventDefault();
        // canSubmits 中多有对象均为True才满足条件， 否则睡眠循环调用自身
        const canSubmit = Object.keys(this.canSubmits).every(key => {
            return this.canSubmits[key] === true;
        });
        if (canSubmit) {
            this.props.accountFunc(this.props.formType, this.state.form);
            return
        }
        setTimeout(() => {
            this.logInOutHandle(e)
        }, 1000)
    }

    /**
     * 动态根据 input 的 id，设定相同名字的state,
     * setState回调表示可以提交表单了。
     */
    setFormState(targetId, targetValue) {
        this.state.form[targetId] = targetValue;
        this.canSubmits[targetId] = true;
    }


    formReset() {
        Object.keys(this.state.form).map(key => {
            const elem = document.getElementById(key)
            if (!elem) {
                return
            }
            if (elem.type === 'text') {
                elem.value = ""
                return
            }
            elem.value = null
        })
    }


    render() {
        const {formType} = this.props
        return (
            <LogInOutTag id="logInOut" ref="logInOut">
                <CommonFormWrapperTag className="log-main">
                    <div className="logo-wrapper">
                        <PositionIconTag
                            type={IconTypeToPosition.logo.type}
                            width="175px"
                            height="51px"
                        />
                    </div>
                    {formType === FormType.login && (
                        <form id="loginForm" >
                            <input type="text" onChange={this.valueChangeHandle} id="loginUsername"/>
                            <input type="password" onChange={this.valueChangeHandle} id="loginPassword"/>
                            <div>
                                <button onClick={this.logInOutHandle}>登陆</button>
                            </div>
                        </form>
                    )}
                    {formType === FormType.regist && (
                        <form id="registForm">
                            <h2>注册 Instagram,分享精彩视界</h2>
                            <div>
                                <button>使用微信登陆</button>
                            </div>
                            <div className="line">line Here</div>
                            <input type="text" onChange={this.valueChangeHandle} id="registPhoneOrEmail"/>
                            <input type="text" onChange={this.valueChangeHandle} id="registFullname"/>
                            <input type="text" onChange={this.valueChangeHandle} id="registUsername"/>
                            <input type="password" onChange={this.valueChangeHandle} id="registPassword"/>
                            <div>
                                <button onClick={this.logInOutHandle}>注册</button>
                            </div>
                            <div>
                                <p>注册即表示你同意我们的 条款 和 隐私权政策 。</p>
                            </div>
                        </form>
                    )}
                </CommonFormWrapperTag>
                <CommonFormWrapperTag>
                    {formType === FormType.login && (
                        <div>
                            <span>没有账户?</span>
                            <Link to="/account/regist">注册</Link>
                        </div>
                    )}
                    {formType === FormType.regist && (
                        <div>
                            <span>已有账户?</span>
                            <Link to="/account/login">登陆</Link>
                        </div>
                    )}
                </CommonFormWrapperTag>
            </LogInOutTag>
        )
    }
}

export default LogInOut