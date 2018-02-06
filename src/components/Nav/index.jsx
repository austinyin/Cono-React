import React, {Component} from 'react'
import './style.scss'
import Link from "react-router-dom/es/Link";
import {LoginState} from "src/Account/constants";
import {connect} from "react-redux";



class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: this.props.account,
        }
    }

    login() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            account: this.props.account,
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
                                {this.state.account.state === LoginState.login
                                    ? <Link to={`/${this.state.account.user.username}`} className="nr-icon self-center-icon"/>
                                    : <Link to="/account" className="nr-icon self-center-icon"/>
                                }
                                <a className="nr-icon pub-icon"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        account: state.Account,
    }
}

export default connect(
    mapStateToProps,
    null
)(Nav)


