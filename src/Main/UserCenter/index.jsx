import React from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {  } from 'react-router-dom'


import './style.scss'

import * as UserActions from "./actions";
import ScrollHOC from "src/shared/HOC/ScrollHOC";
import TweetCard from "src/components/TweetCard";
import * as DialogActions from "src/components/Dialog/actions";
import {logout as logoutAction} from "src/Account/actions";
import {tweetFullCardElemSet} from "../../components/Dialog/actions";
import withRouter from "react-router-dom/es/withRouter";


class UserCenter extends React.Component {
    constructor(props) {
        super(props);
        this.listUpdating = false;
        this.init = this.init.bind(this);
        this.listUpdate = this.listUpdate.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.logoutHandl = this.logoutHandl.bind(this);
        this.tweetClickFuncHandl = this.tweetClickFuncHandl.bind(this);
        this.state = {
            username: null,
            userInfo: this.props.userInfo,
            tweetList: this.props.tweetList
    }
    }

    showDialog(){
        this.props.dialogDisplaySet({
            dialogButtons: true
        })
    }

    tweetClickFuncHandl(id) {
        this.props.tweetFullCardElemSet(id)
        this.props.dialogDisplaySet({tweetFullCard: true})
    }

    listUpdate() {
        this.listUpdating = true;
        this.props.tweetNextPage({username: this.state.username})
    }


    receiveDistance(distance) {
        if (this.listUpdating === false && distance > -70) {
            this.listUpdate()
        }
    }

    chPassHandl() {
        console.log('chPass')
    }

    logoutHandl(){
        this.props.logout({history: this.props.history})
    }

    dialogSet(){
        const dialogs = [
            {text: '更改密码', func: this.chPassHandl},
            {text: '退出', func: this.logoutHandl},
        ];
        this.props.dialogButtonsElemSet(dialogs)
    }

    init() {
        // 初始数据获得
        const username = this.props.match.params.user
        this.setState({
            username: username,
        }, () => {
            this.props.userInfoGet({username:this.state.username});
            for (let i = 0; i < 2; i++) {
                this.listUpdate();
            }
            // 弹窗初始化
            this.dialogSet()
        })
    }

    componentDidMount() {
        this.init()
    }

    componentWillReceiveProps(nextProps) {
        // 将state 与redux 同步
        if (this.state.tweetList !== nextProps.tweetList) {
            this.setState({
                tweetList: nextProps.tweetList,
            }, () => {
                this.listUpdating = false;
            })
        } else if (this.state.userInfo !== nextProps.userInfo) {
            this.setState({
                userInfo: nextProps.userInfo
            })
        }
    }

    componentWillUnmount() {
        // 清空列表
        this.props.userResetAll();
    }


    render() {
        if(this.state.userInfo){return (
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
                                    <h1>{this.state.userInfo.username}</h1>
                                    <span></span>
                                </div>
                                {this.props.userInfo.isSelf ?
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
                                            <button>关注</button>
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
                                <p>{this.state.userInfo.describe}</p>
                                <a href="">{this.state.userInfo.web_page}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tweets-con">
                <div className="row">
                    {this.state.tweetList.map((tweet) => {
                        return(
                            <div key={tweet.id} id={`tweet-${tweet.id}`} className="tweet-card-con col-4">
                                <TweetCard clickFuncHandle={this.tweetClickFuncHandl} tweet={tweet}/>
                            </div>
                        )
                    })}
                </div>
            </div>
                {this.props.children}
            </div>

        )}return <div>temp</div>
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.User.userInfo,
        tweetList: state.User.tweetList,
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
        tweetFullCardElemSet: bindActionCreators(tweetFullCardElemSet, dispatch),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ScrollHOC(UserCenter)))
