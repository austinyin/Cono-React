import React from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import withRouter from "react-router-dom/es/withRouter";
import './style.scss'

import TweetCard from "src/components/TweetCard";
import ScrollRelationHOC from "src/shared/HOC/ScrollRelationHOC";

import * as UserActions from "./actions";
import * as DialogActions from "src/components/Dialog/actions";
import {logout as logoutAction} from "src/extra/Account/actions";
import {tweetFullCardElemSet} from "../../components/Dialog/actions";

import {PersonUserRelationType} from "src/extra/Relation/model";


class UserCenter extends React.Component {
    constructor(props) {
        super(props);
        this.listUpdating = false;

        this.init = this.init.bind(this);
        this.listUpdate = this.listUpdate.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.logoutHandl = this.logoutHandl.bind(this);
        this.chPassHandl = this.chPassHandl.bind(this);
        this.tweetClickFuncHandl = this.tweetClickFuncHandl.bind(this);
        this.followClickHandle = this.followClickHandle.bind(this);

        this.state = {
            username: props.match.params.user,
        }
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
        this.props.history.push('/setting/password')
        this.props.dialogDisplaySet({dialogButtons: false})
    }

    logoutHandl() {
        this.props.logout({history: this.props.history})
    }

    receiveDistance(distance) {
        if (this.listUpdating === false && distance > -70) {
            this.listUpdate()
        }
    }

    dialogSet() {
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

    listUpdate() {
        if (!this.props.isEmpty) {
            this.listUpdating = true;
            this.props.tweetNextPage({username: this.state.username})
        }
    }

    init(routeUsername = this.props.match.params.user) {
        // 初始数据获得
        this.setState({
            username: routeUsername,
        }, () => {
            this.props.userInfoGet({username: this.state.username});
            this.listUpdate();
            // 弹窗初始化
            this.dialogSet()
        })
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


    render() {
        const user = this.props.user
        const tweetList = this.props.tweetList
        const relations = this.props.relations ? this.props.relations : {}
        if (user.hasOwnProperty('id')) {
            return (
                <div id="userCenter" className="container">
                    <div className="user-header-con">
                        <div className="row">
                            <div className="user-header-left col-4">
                                <div>
                                    <img src="" alt=""/>
                                </div>
                            </div>
                            <div className="user-header-right col-8">
                                <div className="right-header">
                                    <div>
                                        <h1>{user.username}</h1>
                                    </div>
                                    {user.isSelf ?
                                        <div>
                                        <span>
                                            <button>编辑个人主页</button>
                                        </span>
                                            <span>
                                            <button onClick={this.showDialog}>SettingBUtton</button>
                                        </span>

                                        </div>
                                        :
                                        <div>
                                        <span>
                                            <button onClick={this.followClickHandle}
                                                    className={relations.is_follow ? "follow-button follow-button-active" : "follow-button"}>关注
                                             </button>
                                        </span>
                                            <span>
                                            <button>↓</button>
                                        </span>
                                            <span>
                                            <button>...</button>
                                        </span>
                                        </div>
                                    }

                                </div>
                                <div className="header-right-middle">
                                <span>
                                    <span>274</span> 帖子
                                </span>
                                    <span>
                                    <span>17.4百万</span> 关注者
                                </span>
                                    <span>
                                    正在关注 <span>0</span>
                                </span>
                                </div>
                                <div className="header-right-bottom">
                                    <p>{user.describe}</p>
                                    <a href="">{user.web_page}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tweets-con">
                        <div className="row">
                            {tweetList.map((tweet) => {
                                return (
                                    <div key={tweet.id} id={`tweet-${tweet.id}`} className="tweet-card-con col-4">
                                        <TweetCard clickFuncHandle={this.tweetClickFuncHandl} tweet={tweet}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {this.props.children}
                </div>

            )
        }
        return <div/>
    }
}

function mapStateToProps(state) {
    return {
        user: state.User.user,
        tweetList: state.User.tweetList,
        isEmpty: state.User.isElement,

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


