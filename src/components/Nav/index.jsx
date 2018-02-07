import React, {Component} from 'react'
import './style.scss'
import Link from "react-router-dom/es/Link";
import {LoginState} from "src/Account/constants";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as DialogActions from "src/components/Dialog/actions";


class Nav extends Component {
    constructor(props) {
        super(props);
        this.showPub = this.showPub.bind(this);
        this.state = {
            account: this.props.account,
        }
    }

    showPub() {
        this.props.dialogDisplaySet({
            pubCard: true
        })
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
                                    ? <Link to={`/${this.state.account.user.username}`}
                                            className="nr-icon self-center-icon"/>
                                    : <Link to="/account" className="nr-icon self-center-icon"/>
                                }
                                <a className="nr-icon pub-icon" onClick={this.showPub}/>
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

function mapDispatchToProps(dispatch) {
    return {
        dialogDisplaySet: bindActionCreators(DialogActions.dialogDisplaySet, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav)


