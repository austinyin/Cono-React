/**
 * 顶部导航组件
 * 包括左侧logo,中间的搜索框,右侧的发现按钮，最近消息按钮，个人中心按钮，发布按钮
 */
import React from 'react'
import Link from "react-router-dom/es/Link";
import {LoginState} from "src/extra/Account/constants";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import SimpleUserCard from 'src/components/SimpleUserCard'
import Notices from 'components/Nav/Notices'


import * as DialogActions from "src/components/Dialog/actions";
import * as SearchActions from "src/extra/Search/actions";
import {NavTag} from "src/components/Nav/style.jsx";
import {RefreshState} from "src/extra/Relation/model";
import {CommonInputTag} from "src/shared/styleJs/componentStyle";
import {SearchResultTag} from "src/components/Nav/style";


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
        if (this.nowState === RefreshState.agitate) {
            return
        }
        const nowIsTop = this.state.isTop
        const scrollTop = document.documentElement.scrollTop
        const navElemHeight = this.navElem.clientHeight
        if (scrollTop > navElemHeight && nowIsTop) {
            this.nowState = RefreshState.agitate
            this.setState({
                isTop: false
            }, () => {
                this.nowState = RefreshState.calm
            })
        }
        if (scrollTop < navElemHeight && !nowIsTop) {
            this.nowState = RefreshState.agitate
            this.setState({
                isTop: true
            }, () => {
                this.nowState = RefreshState.calm
            })
        }
    }

    /**
     * 人物搜索逻辑
     * 通过reducer来筛选redux中缓存的数据
     */
    searchChangeHandle(e) {
        if (e.target.value) {
            this.props.userSearchGet(e.target.value);
        } else {
            this.setState({
                searchUserList: []
            })
        }
    }

    /**
     * 显示最近消息
     */
    toggleNoticeHandle() {
        this.setState({
            showNotice: !this.state.showNotice
        })
    }

    /**
     * 显示发布弹窗
     */
    showPub() {
        this.props.dialogDisplaySet({
            pubCard: true
        })
    }


    render() {
        const account = this.props.account
        const {searchUserList, showNotice} = this.state // 搜索结果和是否显示最新消息

        let NoticesElem
        let SelfCenterIconElem

        if (account.state === LoginState.login) {
            NoticesElem =
                <div ref="noticesCon" className={showNotice ? "notices-con" : "notices-con notice-hide"}>
                    <Notices/>
                </div>
            SelfCenterIconElem = <Link to={`/user/${account.user.username}`}
                                       className="nr-icon self-center-icon"/>
        }

        if (account.state === LoginState.logout) {
            SelfCenterIconElem = <Link to="/account/login" className="nr-icon self-center-icon"/>
        }

        return (
            <NavTag id="nav"
                    innerRef={(elem) => this.navElem = elem}
                    isTop={this.state.isTop}
            >
                <div className="container-fluid">
                    <div className="row nav-main justify-content-between">
                        <div className="nav-left col-5 col-md-4">
                            <Link to="/" className="nl-infos-con"/>
                            <Link to="/" className="nl-infos-con nl-infos-con-moving"/>
                        </div>
                        <div className="nav-center col-md-3 d-none d-md-flex">
                            <div className="input-con">
                                <CommonInputTag onChange={this.searchChangeHandle} type="text" placeholder="search"/>
                                <SearchResultTag
                                    hide={searchUserList.length < 1}
                                >
                                    {searchUserList.map((user, k) => {
                                        return (account.user.id !== user.id) && (
                                            <li>
                                                <SimpleUserCard user={user}
                                                                showSubtitle={true}
                                                                key={user.id}
                                                />
                                            </li>
                                        )
                                    })}
                                </SearchResultTag>
                            </div>
                        </div>
                        <div className="nav-right col-7 col-md-5">
                            <div className="nr-infos-con">
                                <Link to="/explore" className="nr-icon explore-icon"/>
                                <span className="notices-icon">
                                    <a onClick={this.toggleNoticeHandle}
                                       className={showNotice ? "nr-icon recent-icon-active" : "nr-icon recent-icon"}
                                    />
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


