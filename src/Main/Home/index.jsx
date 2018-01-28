import React from 'react'

import Nav from 'components/Nav'
import './style.scss'


class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id="home">
                <div className="nav-con container">
                    <Nav/>
                </div>
                <div className="main-con container">
                    <div className="row">
                        <div className="main-left-con col-8">a</div>
                        <div className="main-right-con col-4">b</div>
                    </div>
                </div>

            </div>

        )
    }
}

export default Home