import React from 'react'


import * as AccountActions from "src/extra/Account/actions";
import {bindActionCreators} from "redux";
import withRouter from "react-router-dom/es/withRouter";
import connect from "react-redux/es/connect/connect";
import {AvatarTag, SettingRightFirstRowTag, SettingRightWrapperTag} from "src/Main/SettingCenter/style";
import {SettingRightRowTag} from "../style";
import {CommonButtonTag} from "../../../shared/styleJs/common/componentStyle";
import {passwordChangeForm} from "../model";
import AvatarSetHOC from "../../../shared/HOC/AvatarSetHOC";
import {changePasswordApi} from "../../../extra/Account/api";


class PasswordSetting extends React.Component {
    constructor(props) {
        super(props);
        this.onFormChange = this.onFormChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.form = passwordChangeForm

    }

    onFormChange(e) {
        const {id, value} = e.target
        this.form[id].value = value
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.HOCchangePasswordHandle(this.form)
        // this.props.changePassword(data, this.props.history) //这里传入了history方便跳转
    }

    render() {
        const loginUser = this.props.HOCloginUser || this.props.loginUser
        return (
            <div className="container-fluid">
                <SettingRightWrapperTag>
                    <SettingRightFirstRowTag className="first-row row">
                        <aside className="col-4">
                            <span><AvatarTag className="avatar" src={loginUser.avatar} alt=""/></span>
                        </aside>
                        <div className="row-right col-8">
                            <h2>{loginUser.username}</h2>
                            {/*AvatarSetHOC中的头像设置form*/}
                            {this.props.children}
                        </div>
                    </SettingRightFirstRowTag>
                    <form action="">
                        {Object.values(this.form).map(item => {
                            return (
                                <SettingRightRowTag className="row">
                                    <aside className="col-4">
                                        <span>{item.label}</span>
                                    </aside>
                                    <div className="row-right col-8">
                                        <input onChange={this.onFormChange} type={item.type} id={item.key}/>
                                    </div>
                                </SettingRightRowTag>
                            )
                        })}
                        <SettingRightRowTag className="row">
                            <aside className="col-4">
                                <span/>
                            </aside>
                            <div className="row-right col-8">
                                <CommonButtonTag onClick={this.onSubmit}>提交</CommonButtonTag>
                            </div>
                        </SettingRightRowTag>
                    </form>
                </SettingRightWrapperTag>
            </div>

        )
    }
}


function mapStateToProps(state) {
    return {
        loginUser: state.Account.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changePassword: bindActionCreators(AccountActions.changePassword, dispatch),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AvatarSetHOC(PasswordSetting)))

