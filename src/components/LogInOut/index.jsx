import React, {Component} from 'react'
import './style.scss'
import {AccountForm, formType, loginType} from "src/extra/Account/constants";

class LogInOut extends Component {
    constructor(props, context) {
        super(props, context);
        this.logInOutHandle = this.logInOutHandle.bind(this)
        this.handlValueChange = this.handlValueChange.bind(this)
        this.setFormState = this.setFormState.bind(this)
        this.valueChangeTimers = {}; // 包含输入框函数节流定时器。
        this.canSubmits = {};  // 包含所有输入框是否可以提交状态
        this.state = AccountForm
    }

    /**
     * 没有设置完state之前不能进行表单提交
     * setState回调表示可以提交表单了。
     * 并包含了函数节流逻辑。
     */
    handlValueChange(e) {
        const targetId = e.target.id;
        const targetValue = e.target.value;
        this.canSubmits[targetId] = false;

        clearTimeout(this.valueChangeTimers[targetId]);
        this.valueChangeTimers[targetId] = setTimeout(() => {
            this.setFormState(targetId, targetValue)
        }, 2000)

    }

    /**
     * 动态根据 input 的 id，设定相同名字的state,
     * setState回调表示可以提交表单了。
     */
    setFormState(targetId, targetValue) {
        const state = Object.assign({}, this.state);
        state[targetId] = targetValue;
        this.setState(state, () => {
            this.canSubmits[targetId] = true;
        })
    }


    logInOutHandle(e) {
        e.preventDefault();
        // canSubmits 中多有对象均为True才满足条件， 否则睡眠循环调用自身
        const canSubmit = Object.keys(this.canSubmits).every(key => {
            return this.canSubmits[key] === true;
        });
        if (canSubmit) {
            const form = this.props.form;
            for (let key of Object.keys(form)) {
                form[key] = this.state[key]
            }
            this.props.accountFunc(this.props.formType, this.props.form);
            return
        }
        setTimeout(() => {
            this.logInOutHandle(e)
        }, 1000)
    }


    render() {
        return (
            <div id="logInOut">
                <div className="log-main">
                    <div>
                        <img src="" alt=""/>
                    </div>

                    {this.props.formType === 'login' ?
                        <form action="">
                            <input type="text" onChange={this.handlValueChange} id="loginUsername"/>
                            <input type="password" onChange={this.handlValueChange} id="loginPassword"/>
                            <div>
                                <button onClick={this.logInOutHandle}>登陆</button>
                            </div>
                        </form>
                        :
                        <form action="">
                            <h2>注册 Instagram,分享精彩视界</h2>
                            <div>
                                <button>使用微信登陆</button>
                            </div>
                            <div className="line">line Here</div>
                            <input type="text" onChange={this.handlValueChange} id="registPhoneOrEmail"/>
                            <input type="text" onChange={this.handlValueChange} id="registFullname"/>
                            <input type="text" onChange={this.handlValueChange} id="registUsername"/>
                            <input type="password" onChange={this.handlValueChange} id="registPassword"/>
                            <div>
                                <button onClick={this.logInOutHandle}>注册</button>
                            </div>
                            <div>
                                <p>注册即表示你同意我们的 条款 和 隐私权政策 。</p>
                            </div>
                        </form>
                    }
                </div>
                <footer>
                    <div>
                        <span>没有账户?</span>
                        <a>注册</a>
                    </div>
                </footer>
            </div>
        )
    }
}

export default LogInOut