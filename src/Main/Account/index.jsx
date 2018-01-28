import React from 'react'

import './style.scss'


class Account extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id="account" className="container">
                <div className="rigist-form">regist</div>
                <div className="login-form">login</div>
            </div>

        )
    }
}

export default Account