import React from 'react'
import './style.scss'
import Explore from "src/Main/Explore";
import Link from "react-router-dom/es/Link";
import {get, post} from "src/shared/js/axiosUtil";

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    login() {
        get('http://127.0.0.1:8000/account/login/').then(data => {
            console.log(data)
        })
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
                                <Link to="/explore" className="nr-icon explore-icon"/>
                                <a className="nr-icon recent-icon"/>
                                <Link to="/UserCenter" className="nr-icon self-center-icon"/>
                                <a className="nr-icon pub-icon" onClick={this.login}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Nav