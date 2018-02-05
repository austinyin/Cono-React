import React from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import SimpleUserCard from "src/components/SimpleUserCard";

import './style.scss'
import * as ExploreActions from "src/Main/Explore/action";


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
        return (
            <div id="exlorePeople" className="container">
                <header>
                    <span>推荐</span>
                </header>
                <div className="recommends">
                    <ul>
                        {this.props.userList.map((user) => {
                            return <SimpleUserCard followButton={true} title={user.username}
                                                   subtitle={user.first_name + user.last_name}/>
                        })}
                    </ul>
                </div>
            </div>

        )
    }
}


function mapStateToProps(state) {
    return {
        userList: state.Explore.userList
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


