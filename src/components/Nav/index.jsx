import React from 'react'
import './style.scss'

class Nav extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id="nav">
                <div className="container">
                    <div className="row nav-main">
                        <div className="col-4 nav-left">
                            <a className="nl-infos-con">
                            </a>
                        </div>
                        <div className="col-4 nav-center">
                            <div className="input-con">
                                <input type="text" placeholder=""/>
                            </div>
                        </div>
                        <div className="col-4 nav-right">
                            <div className="nr-infos-con">
                                <a className="nr-icon explore-icon"></a>
                                <a className="nr-icon recent-icon"></a>
                                <a className="nr-icon self-center-icon"></a>
                                <a className="nr-iconpub-icon"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Nav