import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import './style.scss'
import TweetFullCard from "src/components/TweetFullCard";
import HomeRightBar from "src/Main/Home/HomeRightBar/HomeRightBar";

import * as TweetListActions from './actions'
import * as ExploreActions from 'Main/Explore/action'


import ScrollHOC from "src/shared/HOC/ScrollHOC";
import {TweetFullCardType} from "src/components/TweetFullCard/model";

class Home extends Component {
    constructor(props) {
        super(props);
        this.listUpdating = false;
    }

    // 使用context传递 TweetFullCard的Type, 让其下方所有组件都能正确的展示自己。
    getChildContext() {
        return {TweetFullCardType: TweetFullCardType.common};
    }

    listUpdate() {
        if(!this.props.isEmpty){
            this.listUpdating = true;
            this.props.tweetNextPage()
        }
    }

    receiveDistance(distance) {
        /**
         * 根据HOC传过来的距离判断是否需要加载tweet数据
         */
        if (this.listUpdating === false && distance > -70) {
            this.listUpdate()
        }
    }

    init() {
        /**
         * 如果登陆了则获取snapshot内容
         */
        this.props.snapshotUserGet();
        this.listUpdate();
    }

    componentDidMount() {
        this.init()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.tweetList !== nextProps.tweetList) {
            this.listUpdating = false;
        }

    }

    componentWillUnmount() {
        // 清空列表
        this.props.tweetListReset();
    }


    render() {
        const tweetList = this.props.tweetList;
        return (
            <div id="home" ref="home">
                <div className="container main">
                    <div className="row">
                        <div className="main-left-con col-8" ref="tweetCon">
                            {tweetList.map((data) => {
                                return <TweetFullCard data={data}/>
                            })}
                        </div>
                        <div className="main-right-con col-4">
                            {this.props.snapshotUserList.length >= 1 ? <HomeRightBar loginUser={this.props.loginUser}
                                                                                     snapshotUserList={this.props.snapshotUserList}/> : ""}
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}


Home.childContextTypes = {
    TweetFullCardType: PropTypes.string,
}


function mapStateToProps(state) {
    return {
        nowPage: state.TweetList.nowPage,
        tweetList: state.TweetList.tweetList,
        isEmpty: state.TweetList.isEmpty,
        snapshotUserList: state.Explore.snapshotUserList,
        loginUser: state.Account.user,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        tweetNextPage: bindActionCreators(TweetListActions.tweetsNextPage, dispatch),
        tweetListReset: bindActionCreators(TweetListActions.tweetsReset, dispatch),
        snapshotUserGet: bindActionCreators(ExploreActions.snapshotUserGet, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScrollHOC(Home))
