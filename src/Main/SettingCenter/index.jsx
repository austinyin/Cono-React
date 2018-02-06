import React from 'react'

import './style.scss'


class SettingCenter extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id="settingCenter" className="container">
                <div className="setting-center-left">
                    <div className="menu">
                        <ul>
                            <li>编辑主页</li>
                        </ul>
                    </div>
                </div>
                <div className="setting-center-right">
                </div>
            </div>

        )
    }
}

export default SettingCenter