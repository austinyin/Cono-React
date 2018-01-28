import React from 'react'

import './style.scss'


class UserCenter extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id="userCenter" className="container">
                <div className="user-header-con">1</div>
                <div className="tweets-con">2</div>
            </div>

        )
    }
}

export default UserCenter