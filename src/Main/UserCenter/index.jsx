/**
 * 用户中心
 * 显示用户的基本信息和发布的推文
 * 根据是否是本人展示不同的状态
 */
import React from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import withRouter from "react-router-dom/es/withRouter";

import TweetCard from "src/components/TweetCard";
import ScrollRelationHOC from "src/shared/HOC/ScrollRelationHOC";

import * as UserActions from "./actions";
import * as DialogActions from "src/components/Dialog/actions";
import {logout as logoutAction} from "src/extra/Account/actions";

import {PersonUserRelationType} from "src/extra/Relation/model";
import {
    CommonButtonTag, CommonWrapperTag, TweetCardConTag,
    TweetItemsWrapperTag
} from "src/shared/styleJs/common/componentStyle";
import {ChooseTag, UserCenterHeaderTag} from "src/Main/UserCenter/style";
import Link from "react-router-dom/es/Link";
import {CenterChooseType, ChooseTypeValueToIsEmptyKey, ChooseTypeValueToTweetKey} from "src/Main/UserCenter/model";
import {IconTypeToPosition, PositionIconTag} from "src/shared/styleJs/common/IconsStyle";

class UserCenter extends React.Component {
    constructor(props) {
        super(props);
        this.listUpdating = false;

        this.init = this.init.bind(this);
        this.listUpdate = this.listUpdate.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.logoutHandl = this.logoutHandl.bind(this);
        this.chPassHandl = this.chPassHandl.bind(this);
        this.changeTweetsClickHandle = this.changeTweetsClickHandle.bind(this);
        this.followClickHandle = this.followClickHandle.bind(this);
        this.state = {
            username: props.match.params.user,
            nowTweetType: CenterChooseType.publish,
        }
    }

    componentDidMount() {
        this.init()
    }

    componentWillReceiveProps(nextProps) {
        /**
         * 因为路由事件没有销毁组件,
         * 这里通过判断props中location来决定是否触发init，暂定这样,可能有更好的办法。
         */
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.props.userResetAll();
            this.init(nextProps.match.params.user)
        }
    }

    componentWillUnmount() {
        // 清空列表
        this.props.userResetAll();
    }

    init(routeUsername = this.props.match.params.user) {
        // 初始数据获得
        this.setState({
            username: routeUsername,
        }, () => {
            this.props.userInfoGet({username: this.state.username});
            this.listUpdate(CenterChooseType.publish);
            this.listUpdate(CenterChooseType.collect);
            // 弹窗初始化
            this.dialogButtonsSet()
        })
    }


    followClickHandle(e) {
        /**
         * 将follow流程交给HOC
         */
        e.stopPropagation()
        const data = {
            targetId: this.props.user.id,
            type: PersonUserRelationType.follow,
        }
        this.props.HOCfollowHandle(data)
    }


    chPassHandl() {
        this.props.history.push('/account/password/change')
        this.props.dialogDisplaySet({dialogButtons: false})
    }

    logoutHandl() {
        this.props.logout({history: this.props.history})
    }

    changeTweetsClickHandle(e) {
        const className = e.target.className
        let nowTweetType = null
        if (className.includes('pub')) {
            nowTweetType = CenterChooseType.publish
        }
        if (className.includes('collect')) {
            nowTweetType = CenterChooseType.collect
        }
        this.setState({
            nowTweetType
        })
    }

    receiveDistance(distance) {
        if (this.listUpdating === false && distance > -70) {
            this.listUpdate()
        }
    }

    dialogButtonsSet() {
        /**
         * 这里将handle函数传递了到了dialog组件，
         * dialog组件中点击相应button将触发本组件中的函数。
         */
        const dialogs = [
            {text: '更改密码', func: this.chPassHandl},
            {text: '退出', func: this.logoutHandl},
        ];
        this.props.dialogButtonsElemSet(dialogs)
    }

    showDialog() {
        this.props.dialogDisplaySet({
            dialogButtons: true
        })
    }

    listUpdate(tweetType = null) {
        const type = tweetType || this.state.nowTweetType
        if (!this.props[ChooseTypeValueToIsEmptyKey[type]]) {
            this.listUpdating = true;
            this.props.tweetNextPage({username: this.state.username, tweetType: type})
        }
    }


    render() {
        const user = this.props.user
        const nowType = this.state.nowTweetType
        const tweetList = this.props[ChooseTypeValueToTweetKey[nowType]].list
        const relations = this.props.relations ? this.props.relations : {}
        if (user.hasOwnProperty('id')) {
            return (
                <CommonWrapperTag id="userCenter" className="container">
                    <div className="user-header-con">
                        <UserCenterHeaderTag className="row">
                            <div className="user-header-left col-4">
                                <div className="avatar-wrapper">
                                    <img className="avatar" src={user.avatar}/>
                                </div>
                            </div>
                            <div className="user-header-right col-5">
                                <div className="right-top">
                                    <h1>{user.username}</h1>
                                    {user.isSelf ? (
                                            <span>
                                                <span>
                                                    <Link to="/account" className="self-center-link">编辑个人主页</Link>
                                                </span>
                                                <span className="setting-icon">
                                                    <PositionIconTag
                                                        onClick={this.showDialog}
                                                        type={IconTypeToPosition.setting.type}
                                                    />
                                                </span>
                                            </span>
                                        )
                                        : (
                                            <span>
                                                <span>
                                                    <CommonButtonTag
                                                        onClick={this.followClickHandle}
                                                        style={{verticalAlign: "middle"}}
                                                        active={relations.is_follow}
                                                    >
                                                        {relations.is_follow ? "已关注" : "关注"}
                                                     </CommonButtonTag>
                                                </span>
                                            </span>
                                        )
                                    }

                                </div>
                                <div className="right-middle">
                                <span>
                                    <span className="bolder-font">{user.tweet_total}</span> 帖子
                                </span>
                                    <span>
                                    <span className="bolder-font">{user.relations_obj.followerList.length}</span> 关注者
                                </span>
                                    <span>
                                    正在关注 <span className="bolder-font">{user.relations_obj.friendList.length}
                                </span>
                                </span>
                                </div>
                                <div className="right-bottom">
                                    <p>{user.self_intro}</p>
                                    <a onClick={() => location.href = `http://${user.web_page}`}>{user.web_page}</a>
                                </div>
                            </div>
                        </UserCenterHeaderTag>
                    </div>
                    {user.isSelf && (
                        <ChooseTag activeType={this.state.nowTweetType}>
                            <div className="choose-main">
                            <span onClick={this.changeTweetsClickHandle} className="choose-item choose-item-pub">
                                帖子
                            </span>
                                <span onClick={this.changeTweetsClickHandle}
                                      className="choose-item choose-item-collect">
                                收藏夹
                            </span>
                            </div>
                        </ChooseTag>
                    )}

                    <TweetItemsWrapperTag className="row">
                        {tweetList.map((tweet) => {
                            return (
                                <div className="col-4" key={tweet.id}>
                                    <TweetCardConTag>
                                        <TweetCard tweet={tweet}/>
                                    </TweetCardConTag>
                                </div>
                            )
                        })}
                    </TweetItemsWrapperTag>
                    {this.props.children}
                </CommonWrapperTag>

            )
        }
        return <div/>
    }
}

function mapStateToProps(state) {
    return {
        user: state.User.user,
        tweetData: state.User.tweetData,
        collectTweetData: state.User.collectTweetData,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logoutAction, dispatch),
        userInfoGet: bindActionCreators(UserActions.userInfoGet, dispatch),
        tweetNextPage: bindActionCreators(UserActions.userTweetsNextPage, dispatch),
        userResetAll: bindActionCreators(UserActions.userResetAll, dispatch),
        dialogButtonsElemSet: bindActionCreators(DialogActions.dialogButtonsElemSet, dispatch),
        dialogDisplaySet: bindActionCreators(DialogActions.dialogDisplaySet, dispatch),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ScrollRelationHOC(UserCenter)))


