import React from 'react'
import Link from "react-router-dom/es/Link";
import {LoginState} from "src/extra/Account/constants";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import SimpleUserCard from 'src/components/SimpleUserCard'
import Notices from 'components/Notices'

import * as DialogActions from "src/components/Dialog/actions";
import * as SearchActions from "src/extra/Search/actions";
import {NavTag} from "src/components/Nav/style.jsx";
import {RefreshState} from "src/extra/Relation/model";
import {CommonInputTag} from "src/shared/styleJs/common/componentStyle";


class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.searchChangeHandle = this.searchChangeHandle.bind(this);
        this.toggleNoticeHandle = this.toggleNoticeHandle.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.showPub = this.showPub.bind(this);
        this.nowState = RefreshState.calm

        this.state = {
            searchUserList: this.props.searchUserList,
            showNotice: false,
            isTop: true,
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasOwnProperty('searchUserList')) {
            this.setState({
                searchUserList: nextProps.searchUserList
            })
        }
    }

    handleScroll() {
        if(this.nowState === RefreshState.agitate){
            return
        }
        console.log('?')
        const nowIsTop = this.state.isTop
        const scrollTop = document.documentElement.scrollTop
        const navElemHeight = this.navElem.clientHeight
        if(scrollTop > navElemHeight && nowIsTop) {
            this.nowState = RefreshState.agitate
            this.setState({
                isTop: false
            },()=> {
                console.log(this.state.isTop)
                this.nowState = RefreshState.calm
            })
        }
        if(scrollTop< navElemHeight && !nowIsTop){
            this.nowState = RefreshState.agitate
            this.setState({
                isTop: true
            },()=> {
                console.log(this.state.isTop)
                this.nowState = RefreshState.calm
            })
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

    toggleNoticeHandle() {
        this.setState({
            showNotice: !this.state.showNotice
        })
    }

    showPub() {
        this.props.dialogDisplaySet({
            pubCard: true
        })
    }


    render() {
        const account = this.props.account
        let NoticesElem = null
        let SelfCenterIconElem = null
        if (account.state === LoginState.login) {
            NoticesElem =
                <div ref="noticesCon" className={this.state.showNotice ? "notices-con" : "notices-con notice-hide"}>
                    <Notices/>
                </div>
            SelfCenterIconElem = <Link to={`/${account.user.username}`}
                                       className="nr-icon self-center-icon"/>
        }

        if (account.state === LoginState.logout) {
            SelfCenterIconElem = <Link to="/account" className="nr-icon self-center-icon"/>
        }

        return (
            <NavTag id="nav"
                    innerRef={(elem) => this.navElem = elem}
                    isTop={this.state.isTop}
            >
                <div className="container-fluid">
                    <div className="row nav-main">
                        <div className="col-5 col-lg-4 nav-left justify-content-between">
                            <Link to="/" className="nl-infos-con"/>
                            <Link to="/" className="nl-infos-con nl-infos-con-moving"/>
                        </div>
                        <div className="col-4 nav-center d-none d-lg-flex">
                            <div className="input-con">
                                <CommonInputTag onChange={this.searchChangeHandle} type="text" placeholder="search"/>
                                <ul className="search-result">
                                    {this.state.searchUserList.map((v, k) => {
                                        return <li key={v.id}>
                                            <SimpleUserCard user={v}/>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="col-7 col-lg-4 nav-right">
                            <div className="nr-infos-con">
                                <Link to="/explore" className="nr-icon explore-icon"/>
                                <span className="notices-icon">
                                    <a onClick={this.toggleNoticeHandle} className="nr-icon recent-icon"/>
                                    {NoticesElem}
                                </span>
                                {SelfCenterIconElem}
                                <a className="nr-icon pub-icon" onClick={this.showPub}/>
                            </div>
                        </div>
                    </div>
                </div>
            </NavTag>

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


