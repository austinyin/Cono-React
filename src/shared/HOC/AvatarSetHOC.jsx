/**
 * 用户信息设置高级组件
 */
import React, {Component} from 'react'
import {bindActionCreators,compose} from "redux";
import {changeAvatarApi, changePasswordApi, changeSelfInfoApi} from "../../extra/Account/api";
import {AvatarSetFormTag} from "../../Main/SettingCenter/style";
import connect from "react-redux/es/connect/connect";
import {loginSucceeded} from "../../extra/Account/actions";

export const AvatarSetHOC = (WrappedComponent) => {
    return class AvatarSetHOC extends Component {
        constructor(props, context) {
            super(props, context);
            this.onAvatarInputChange = this.onAvatarInputChange.bind(this)
            this.changeSelfInfoHandle = this.changeSelfInfoHandle.bind(this)
            this.changePasswordHandle = this.changePasswordHandle.bind(this)
            this.state = {
                loginUser: null
            }
        }

        /**
         * 改变用户头像
         */
        onAvatarInputChange(e) {
            if (e.target.value) {
                const formData = new FormData();
                formData.append('file', e.target.files[0]);
                changeAvatarApi(formData).then(data => {
                    this.setState({
                        loginUser: data.user
                    })
                })
            }
        }

        /**
         * 改变用户信息
         */
        changeSelfInfoHandle(form){
            changeSelfInfoApi(form).then(data => {
                this.redirectAfterStateSet(data.user)
            })
        }


        /**
         * 改变用户密码
         */
        changePasswordHandle(form){
            changePasswordApi(form).then(data => {
                this.redirectAfterStateSet(data.user)
            })
        }


        /**
         * 用户信息改变后跳转页面。
         */
        redirectAfterStateSet(user){
            if(user.hasOwnProperty('id')){
                this.setState({loginUser: user},() =>{
                    this.props.login({user: user})
                })
            }
        }


        render() {
            return (
                <WrappedComponent
                    ref="wrapChild"
                    {...this.props}
                    HOCloginUser={this.state.loginUser}
                    HOCchangeSelfInfoHandle={this.changeSelfInfoHandle}
                    HOCchangePasswordHandle={this.changePasswordHandle}
                >
                    <AvatarSetFormTag>
                        <a className="avatar-set-button" onClick={() => this.avatarInput.click()}>点击修改头像</a>
                        <input type="file" ref={x => this.avatarInput = x} onChange={this.onAvatarInputChange}/>
                    </AvatarSetFormTag>
                </WrappedComponent>
            )
        }
    }
};



export function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(loginSucceeded, dispatch),
    }
}


export default compose(
    connect(
        null,
        mapDispatchToProps
    ),
    AvatarSetHOC,
)


