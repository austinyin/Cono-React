import React, {Component} from 'react'
import './style.scss'
import Link from "react-router-dom/es/Link";
import {LoginState} from "src/extra/Account/constants";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import SimpleUserCard from 'src/components/SimpleUserCard'

import * as DialogActions from "src/components/Dialog/actions";
import * as SearchActions from "src/extra/Search/actions";


class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.showPub = this.showPub.bind(this);
        this.searchChangeHandle = this.searchChangeHandle.bind(this);
        this.state = {
            searchUserList: this.props.searchUserList
        }
    }

    searchChangeHandle(e) {
        if (e.target.value) {
            this.props.userSearchGet(e.target.value);
        } else {
            this.setState({
                searchUserList: []
            })
        }
    }

    showPub() {
        this.props.dialogDisplaySet({
            pubCard: true
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasOwnProperty('searchUserList')) {
            this.setState({
                searchUserList: nextProps.searchUserList
            })
        }

    }


    render() {
        return (
            <div id="nav">
                <div className="container">
                    <div className="row nav-main">
                        <div className="col-4 nav-left">
                            <Link to="/" className="nl-infos-con"/>
                        </div>
                        <div className="col-4 nav-center">
                            <div className="input-con">
                                <input onChange={this.searchChangeHandle} type="text" placeholder="search"/>
                                <ul className="search-result">
                                    {this.state.searchUserList.map((v, k) => {
                                        return <li key={v.id}>
                                            <SimpleUserCard user={v}/>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="col-4 nav-right">
                            <div className="nr-infos-con">
                                <Link to="/explore" className="nr-icon explore-icon"/>
                                <a className="nr-icon recent-icon"/>
                                {this.props.account.state === LoginState.login
                                    ? <Link to={`/${this.props.account.user.username}`}
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
        searchUserList: state.Search.userList,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dialogDisplaySet: bindActionCreators(DialogActions.dialogDisplaySet, dispatch),
        userSearchGet: bindActionCreators(SearchActions.userSearchGet, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav)


