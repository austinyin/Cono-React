/**
 * 首页
 */
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
    constructor(props, context) {
        super(props, context);
        this.resizeScrollTopReciever = this.resizeScrollTopReciever.bind(this);
        this.listUpdating = false; // 函数节流和保证每次刷新的正确完成
        this.state = {
            // rightBar组件的样式,滑动到某一距离则显示固定定位
            rightBarStyle: {}
        }
    }

    // 使用context传递 TweetFullCard的Type, 让其下方所有组件都能正确的展示自己。
    getChildContext() {
        return {TweetFullCardType: TweetFullCardType.common};
    }

    componentDidMount() {
        /**
         * 如果已登陆则获取snapshot内容
         */
        window.addEventListener('resize', this.onWindowResize)
        this.props.snapshotUserGet();
        this.listUpdate();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.tweetData !== nextProps.tweetData) {
            this.listUpdating = false;
        }

    }

    componentWillUnmount() {
        // 组件销毁则清空数据(待加入缓存功能)
        this.props.tweetListReset();
    }

    listUpdate() {
        if (!this.props.isEmpty) {
            this.listUpdating = true;
            this.props.tweetNextPage()
        }
    }

    resizeScrollTopReciever(scrollTop) {
        /**
         * 在滚动或者伸缩窗口时，都能保证rightBar的准确定位。
         * 在顶部导航nav底部滚动到了 rightBar组件顶部位置时，将rightBar进行固定定位
         */
        const tweetConElem = this.refs.tweetCon
        const fixRight = tweetConElem.offsetWidth + tweetConElem.offsetLeft
        const fixTop = tweetConElem.offsetTop
        const NavHeight = 53
        let rightBarStyle = {}
        if (scrollTop > (fixTop - NavHeight)) {
            rightBarStyle = {
                position: "fixed",
                left: fixRight,
                top: `${NavHeight}px`,
                maxWidth: tweetConElem.offsetWidth / 2
            }
        }
        this.setState({
            rightBarStyle: rightBarStyle
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
        const {tweetList, loginUser} = this.props;

        return (
            <HomeTag id="home" ref="home">
                <div className="container-fluid ">
                    <div className="row main justify-content-center">
                        <div className="main-left-con col-12 col-md-8" ref="tweetCon">
                            {/*暂时显示自己发布的内容*/}
                            {tweetList.map((data) => {
                                return  <TweetFullCard tweetData={data} key={data.id}/>
                                // return (loginUser.id !== data.user.id) && <TweetFullCard tweetData={data} key={data.id}/>
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
                {/*滚动刷新的路标*/}
                {this.props.children}
            </HomeTag>
        )
    }
}


Home.childContextTypes = {
    TweetFullCardType: PropTypes.number,
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
