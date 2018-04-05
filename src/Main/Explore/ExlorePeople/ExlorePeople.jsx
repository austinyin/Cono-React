/**
 * 朋友推荐页
 */
import React from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import SimpleUserCard from "src/components/SimpleUserCard";

import * as ExploreActions from "src/Main/Explore/action";
import {ExplorePeopleTag, ExplorePeopleWrapperTag, UserCardWrapper} from "./style";

class ExlorePeople extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            userList: this.props.userList
        }
    }

    init() {
        // 初始数据
        this.props.userGet();
    }


    componentDidMount() {
        //初始化
        this.init()
    }

    componentWillReceiveProps(nextProps) {
        // 将state 与 redux 同步
        this.setState({
            userList: nextProps.userList
        }, () => {
            this.listUpdating = false;
        })

    }

    componentWillUnmount() {
        // 清空列表
        this.props.resetAll();
        window.removeEventListener('scroll', this.handleScroll);
    }


    render() {
        const {loginUser, userList} = this.props
        return (
            <ExplorePeopleWrapperTag>
                <ExplorePeopleTag id="exlorePeople" className="container-fluid">
                    <header>
                        <span>推荐</span>
                    </header>
                    <div className="recommends">
                        <ul>
                            {userList.map((user) => {
                                return (loginUser.id !== user.id) && (
                                    <UserCardWrapper>
                                        <div>
                                            <SimpleUserCard followButton={true}
                                                            imgWidth="56px"
                                                            imgHeight="56px"
                                                            user={user}
                                                            key={user.id}
                                            />
                                        </div>
                                    </UserCardWrapper>
                                )

                            })}
                        </ul>
                    </div>
                </ExplorePeopleTag>
            </ExplorePeopleWrapperTag>
        )
    }
}


function mapStateToProps(state) {
    return {
        userList: state.Explore.userList,
        loginUser: state.Account.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userGet: bindActionCreators(ExploreActions.recommendUserGet, dispatch),
        resetAll: bindActionCreators(ExploreActions.resetAll, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExlorePeople)


