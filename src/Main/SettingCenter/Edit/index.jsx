/**
 *
 */
import React from 'react'
import {
    AvatarTag,
    SelectTag,
    SettingRightFirstRowTag,
    SettingRightRowTag,
    SettingRightWrapperTag
} from "src/Main/SettingCenter/style";
import {CommonButtonTag} from "src/shared/styleJs/componentStyle";
import {bindActionCreators} from "redux";
import {logout as logoutAction} from "src/extra/Account/actions";
import withRouter from "react-router-dom/es/withRouter";
import {editForm} from "src/Main/SettingCenter/model";
import {connect} from "react-redux";
import AvatarSetHOC from "../../../shared/HOC/AvatarSetHOC";


class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.onFormChange = this.onFormChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.form = editForm
    }

    onFormChange(e) {
        const {id, value} = e.target
        this.form[id].value = value
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.HOCchangeSelfInfoHandle(this.form)

    }

    render() {
        const loginUser = this.props.HOCloginUser || this.props.loginUser
        return (
            <div id="edit" className="container-fluid">
                <SettingRightWrapperTag>
                    <SettingRightFirstRowTag className="first-row row">
                        <aside className="col-4">
                            <span><AvatarTag className="avatar" src={loginUser.avatar} alt=""/></span>
                        </aside>
                        <div className="row-right col-8">
                            <h2>{loginUser.username}</h2>
                            {/*AvatarSetHOC 中的头像设置form*/}
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
                                    <div className="row-right col-8
                                    ">
                                        {item.key === "gender" ?
                                            <SelectTag onChange={this.onFormChange} id={item.key}>
                                                {item.options.map(option => {
                                                    return <option value={option.value}>{option.key}</option>
                                                })}
                                            </SelectTag>
                                            : (
                                                <input onChange={this.onFormChange} type={item.type} id={item.key}/>
                                            )}

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
        logout: bindActionCreators(logoutAction, dispatch),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AvatarSetHOC(Edit)))


