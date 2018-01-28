import React from 'react'
import './style.scss'

class Nav extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return(
            <div id="nav">
                <div className="row">
                    <div className="col-4">left</div>
                    <div className="col-4">middle</div>
                    <div className="col-4">right</div>
                </div>
            </div>
        )
    }
}

export default Nav