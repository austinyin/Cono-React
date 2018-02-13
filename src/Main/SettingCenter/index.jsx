import React from 'react'

import './style.scss'
import SettingCenterRouter from "src/Main/SettingCenter/router";
import PasswordSetting from "src/Main/SettingCenter/PasswordSetting";


class SettingCenter extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        return (
            <div id="settingCenter" className="container">
                <div className="setting-center-left">
                    <aside className="menu">
                        <ul>
                            <li>编辑主页</li>
                        </ul>
                    </aside>
                </div>
                <div className="setting-center-right">
                </div>
                <SettingCenterRouter match={this.props.match}/>
            </div>


        )
    }
}

export default SettingCenter