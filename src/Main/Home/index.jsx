import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import TweetFullCard from "src/components/TweetFullCard";
import HomeRightBar from "src/Main/Home/HomeRightBar/HomeRightBar";

import * as TweetListActions from './actions'
import * as ExploreActions from 'Main/Explore/action'


import ScrollHOC from "src/shared/HOC/ScrollHOC";
import {TweetFullCardType} from "src/components/TweetFullCard/model";
import {HomeTag} from "src/Main/Home/style";

class Home extends Component {
    constructor(props,context) {
        super(props,context);
        this.resizeScrollTopReciever = this.resizeScrollTopReciever.bind(this);
        this.listUpdating = false;
        this.state = {
            rightBarStyle: {}
        }
    }

    // 使用context传递 TweetFullCard的Type, 让其下方所有组件都能正确的展示自己。
    getChildContext() {
        return {TweetFullCardType: TweetFullCardType.common};
    }

    componentDidMount() {
        /**
         * 如果登陆了则获取snapshot内容
         */
        window.addEventListener('resize',this.onWindowResize)
        this.props.tweetListReset();
        this.props.snapshotUserGet();
        this.listUpdate();    }

    componentWillReceiveProps(nextProps) {
        if (this.props.tweetData !== nextProps.tweetData) {
            this.listUpdating = false;
        }

    }

    componentWillUnmount() {
        // 不清空，用作缓存
        // this.props.tweetListReset();
    }

    listUpdate() {
        if(!this.props.isEmpty){
            this.listUpdating = true;
            this.props.tweetNextPage()
        }
    }

    resizeScrollTopReciever(scrollTop){
        /**
         * 在滚动或者伸缩窗口时，都能保证rightBar的准确定位。
         */
        const tweetConElem = this.refs.tweetCon
        const fixRight = tweetConElem.offsetWidth + tweetConElem.offsetLeft
        const fixTop = tweetConElem.offsetTop
        const NavHeight = 53
        let rightBarStyle = {}
        if(scrollTop>fixTop - NavHeight){
            rightBarStyle = {
                position: "fixed",
                left: fixRight,
                top: `${NavHeight}px`,
                maxWidth: tweetConElem.offsetWidth/2
            }
        }
        this.setState({
            rightBarStyle:rightBarStyle
        })
    }



    receiveDistance(distance) {
        /**
         * 根据HOC传过来的距离判断是否需要加载tweet数据
         */
        if (this.listUpdating === false && distance > -70) {
            this.listUpdate()
        }
    }

    render() {
        const tweetList = this.props.tweetList;
        return (
            <HomeTag id="home" ref="home">
                <div className="container-fluid ">
                    <div className="row main justify-content-center">
                        <div className="main-left-con col-12 col-md-8" ref="tweetCon">
                            {tweetList.map((data) => {
                                return <TweetFullCard tweetData={data}/>
                            })}
                        </div>
                        <div className="main-right-con col-md-4 d-none d-lg-flex ">
                            <div style={this.state.rightBarStyle}>
                                {this.props.snapshotUserList.length >= 1 && (
                                    <HomeRightBar loginUser={this.props.loginUser}
                                                  snapshotUserList={this.props.snapshotUserList}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.children}
            </HomeTag>
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
