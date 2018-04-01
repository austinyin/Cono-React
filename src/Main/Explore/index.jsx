import React from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as ExploreActions from "./action";
import SimpleUserCard from "src/components/SimpleUserCard";
import TweetCard from "src/components/TweetCard";
import ScrollHOC from "src/shared/HOC/ScrollHOC";
import Link from "react-router-dom/es/Link";
import {CommonWrapperTag, TweetCardConTag, TweetItemsWrapperTag} from "src/shared/styleJs/common/componentStyle";
import {ExploreTag} from "src/Main/Explore/style";
class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.listUpdating = false;
    }


    listUpdate() {
        if (!this.props.isEmpty) {
            this.listUpdating = true;
            this.props.tweetNextPage()
        }
    }

    receiveDistance(distance) {
        if (this.listUpdating === false && distance > -70) {
            this.listUpdate()
        }
    }


    init() {
        // 初始两倍数据
        this.props.userGet();
        this.props.tweetNextPage();

    }


    componentDidMount() {
        //初始化
        this.init()
    }

    componentWillReceiveProps(nextProps) {
        // 将state 与redux 同步
        if (this.props.tweetData !== nextProps.tweetData) {
            this.listUpdating = false;
        }
    }

    componentWillUnmount() {
        // 清空列表
        this.props.resetAll();
    }


    render() {
        const {userList,tweetList,loginUser} = this.props

        return (
            <CommonWrapperTag>
                <ExploreTag id="explore" className="container-fluid">
                    <div className="explore-header">
                        <header>
                            <span>发现用户</span>
                            <Link to="/explore/people" className="header-more-link">
                                <span>查看全部</span>
                            </Link>
                        </header>
                        <div className="header-users-con row">
                            {userList.map((user, index) => {
                                if (index < 3) {
                                    return (loginUser.id!==user.id)&&(
                                        <div className="user-card-con col-4">
                                            <SimpleUserCard
                                                imgWidth="78px"
                                                imgHeight="78px"
                                                showSubtitle={true}
                                                followButton={true}
                                                verticle={true}
                                                user={user}
                                                key={user.id}
                                            />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    <div className="explore-main">
                        <header>
                            <span>探索</span>
                        </header>
                        <TweetItemsWrapperTag className="row">
                                {tweetList.map((tweet) => {
                                    return (loginUser.id!==tweet.user.id)&&(
                                        <div className="col-4">
                                            <TweetCardConTag>
                                                <TweetCard tweet={tweet} key={tweet.id}/>
                                            </TweetCardConTag>
                                        </div>
                                    )
                                })}
                        </TweetItemsWrapperTag>
                        {this.props.children}
                    </div>
                </ExploreTag>
            </CommonWrapperTag>


        )
    }
}

function mapStateToProps(state) {
    return {
        nowPage: state.Explore.nowPage,
        tweetList: state.Explore.tweetList,
        userList: state.Explore.userList,
        isEmpty: state.TweetList.isEmpty,
        loginUser: state.Account.user,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        tweetNextPage: bindActionCreators(ExploreActions.recommendTweetsNextPage, dispatch),
        resetAll: bindActionCreators(ExploreActions.resetAll, dispatch),
        userGet: bindActionCreators(ExploreActions.recommendUserGet, dispatch),

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScrollHOC(Explore))

