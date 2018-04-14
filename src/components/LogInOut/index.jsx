import React, {Component} from 'react'
import './style.scss'
import {AccountForm, FormType, formType, loginType} from "src/extra/Account/constants";
import {Link} from "react-router-dom";
import {CommonFormWrapperTag, LogInOutTag} from "src/components/LogInOut/style";
import {IconTypeToPosition, PositionIconTag} from "src/shared/styleJs/iconsStyle";

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
            form: Object.assign({}, AccountForm),
        }
    }


    /**
     * 没有设置完state之前不能进行表单提交
     * setState回调表示可以提交表单了。
     * 加入了函数节流。
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

    /**
     * 登陆登出逻辑
     * canSubmits 中所有对象均为True才满足条件， 否则睡眠循环调用自身
     */
    logInOutHandle(e) {
        e.preventDefault();
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

    /**
     * 表单重置
     */
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
                        <form id="loginForm">
                            <input type="text" onChange={this.valueChangeHandle} placeholder="用户名" id="loginUsername"/>
                            <input type="password" onChange={this.valueChangeHandle} placeholder="密码"
                                   id="loginPassword"/>
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
                            <input type="text" onChange={this.valueChangeHandle} placeholder="手机或邮箱"
                                   id="registPhoneOrEmail"/>
                            <input type="text" onChange={this.valueChangeHandle} placeholder="姓名" id="registFullname"/>
                            <input type="text" onChange={this.valueChangeHandle} placeholder="用户名" id="registUsername"/>
                            <input type="password" onChange={this.valueChangeHandle} placeholder="密码"
                                   id="registPassword"/>
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