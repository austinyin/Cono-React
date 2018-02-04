import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import './style.scss'
import TweetFullCard from "src/components/TweetFullCard";
import HomeRightBar from "src/Main/Home/HomeRightBar/HomeRightBar";

import * as TweetListActions from './actions'
import ScrollHOC from "src/shared/HOC/ScrollHOC";

class Home extends Component {
    constructor(props) {
        super(props);
        this.listUpdating = false;
        this.state = {
            nowPage: this.props.nowPage,
            tweetList: this.props.tweetList,
        }

    }


    listUpdate() {
        this.listUpdating = true;
        this.props.tweetNextPage()
    }



    receiveDistance(distance) {
        if(this.listUpdating === false && distance > -70) {
            this.listUpdate()
        }
    }


    init() {
        for (let i = 0; i < 2; i++) {
            this.listUpdate();
        }
    }

    componentDidMount() {
        this.init()
    }

    componentWillReceiveProps(nextProps) {
        // 将state 与redux 同步
        if(this.state.tweetList !== nextProps.tweetList) {
            this.setState({
                tweetList: nextProps.tweetList
            }, () => {
                this.listUpdating = false;
            })
        }

    }

    componentWillUnmount() {
        // 清空列表
        this.props.tweetListReset();
    }


    render() {
        return (
            <div id="home" ref="home">
                <div className="container main">
                    <div className="row">
                        <div className="main-left-con col-8" ref="tweetCon">
                            {this.state.tweetList.map((data) => {
                                return <TweetFullCard data={data}/>
                            })}
                        </div>
                        <div className="main-right-con col-4">
                            <HomeRightBar/>
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        nowPage: state.TweetList.nowPage,
        tweetList: state.TweetList.tweetList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        tweetNextPage: bindActionCreators(TweetListActions.tweetsNextPage, dispatch),
        tweetListReset: bindActionCreators(TweetListActions.tweetsReset, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScrollHOC(Home))
