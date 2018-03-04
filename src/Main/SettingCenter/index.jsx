import React from 'react'

import SettingCenterRouter from "src/Main/SettingCenter/router";
import Link from "react-router-dom/es/Link";
import {CommonWrapperTag} from "src/shared/styleJs/common/componentStyle";
import {SettingCenterTag, SettingLeftElemTag} from "src/Main/SettingCenter/style";
import {settingElemList} from "src/Main/SettingCenter/model";
import withRouter from "react-router-dom/es/withRouter";


class SettingCenter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onLocationChange = this.onLocationChange.bind(this)
        this.state = {
            settingElemList:settingElemList
        }
    }

    componentWillMount(){
        this.onLocationChange()
    }

    onLocationChange(location=this.props.location){
        const path = location.pathname
        const settingElemList = [...this.state.settingElemList]
        settingElemList.forEach(elem => {
            if(path.includes(elem.link)){
                elem.active = true
                return elem
            }
            elem.active = false
            return elem
        })
        this.setState({
            settingElemList
        })
    }
    componentWillReceiveProps(nextProps){
        if(this.props.location.pathname !== nextProps.location.pathname){
            this.onLocationChange(nextProps.location)
        }
    }



    render() {
        return (
            <CommonWrapperTag>
                <SettingCenterTag id="settingCenter" className="container-fluid">
                    <div className="row">
                        <div className="setting-center-left col-3">
                            <aside className="menu">
                                <ul>
                                    {this.state.settingElemList.map(elem => {
                                        return (
                                            <SettingLeftElemTag
                                                className="left-item"
                                                active={elem.active}
                                            >
                                                <Link to={elem.link}>{elem.label}</Link>
                                            </SettingLeftElemTag>
                                        )
                                    })}
                                </ul>
                            </aside>
                        </div>
                        <div className="setting-center-right col-8">
                            <SettingCenterRouter match={this.props.match}/>
                        </div>
                    </div>
                </SettingCenterTag>
            </CommonWrapperTag>


        )
    }
}

export default withRouter(SettingCenter)