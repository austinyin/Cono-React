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

        onAvatarInputChange(e) {
            // 新建formData, 传给父组件.
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

        changeSelfInfoHandle(form){
            changeSelfInfoApi(form).then(data => {
                this.redirectAfterStateSet(data.user)
            })
        }

        changePasswordHandle(form){
            changePasswordApi(form).then(data => {
                this.redirectAfterStateSet(data.user)

            })
        }

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
                    HOCchangePasswordHandle={this.changePasswordHandle}>
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


