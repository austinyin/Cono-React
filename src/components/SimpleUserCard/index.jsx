import React from 'react'
import './style.scss'
import Link from "react-router-dom/es/Link";
import * as RelationActions from "src/extra/Relation/actions";
import {bindActionCreators} from "redux";
import {PersonUserRelationType, RefreshState, RefreshType} from "src/extra/Relation/model";
import connect from "react-redux/es/connect/connect";
import {LoginState} from "src/extra/Account/constants";
import withRouter from "react-router-dom/es/withRouter";

class SimpleUserCard extends React.Component {
    constructor(props) {
        super(props);
        this.followButtonClickHandle = this.followButtonClickHandle.bind(this);
        this.state = {
            user: this.props.user
        }
    }

    followButtonClickHandle(e) {
        e.stopPropagation() //禁止冒泡
        if (this.props.loginState !== LoginState.login) {
            this.props.history.push('/account')
        }
        const data = {
            targetId: this.state.user.id,
            type: PersonUserRelationType.follow,
        }
        this.setState({
            refreshState: RefreshState.agitate
        }, () => {
            this.props.personRelationsSet(data)
            this.settleDown()
        })
    }

    refreshStateDetect(settleDownTimer) {
        const selfId = this.state.user.id;
        const refreshObj = this.props.personRefreshObj
        const findKey = Object.keys(refreshObj).find(k => {
            return parseInt(k) === selfId && refreshObj[k].state === RefreshState.agitate;
        })
        if (findKey) {
            const newPersonData = refreshObj[findKey].data
            this.setState({
                refreshState: RefreshState.calm,
                user: newPersonData
            }, () => {
                this.props.relationsRefreshDone({id: selfId, type: RefreshType.person})
                clearInterval(settleDownTimer)
            })
        }
    }

    settleDown() {
        const settleDownTimer = setInterval(() => {
            this.refreshStateDetect(settleDownTimer)
        }, 1000)
    }


    render() {
        const user = this.state.user
        return (
            <div id="SimpleUserCard" className={this.props.verticle ? 'd-flex flex-column' : ''}>
                <div className={this.props.verticle ? 'd-flex flex-column suc-left' : 'suc-left'}>
                    <Link to={`/${user.username}`} className="img-con">
                        <img className="img " src={require("src/assets/img/avatar/avatar.jpg")}/>
                    </Link>
                    <Link to={`/${user.username}`} className="infos-con">
                        <span ref="title" className="left-item left-title">{user.username}</span>
                        <span
                            className="left-item left-subtitle">{user.fullname ? user.fullname : ''}</span>
                    </Link>
                </div>
                {this.props.middle ? <div className="suc-middle">middle</div> : ''}
                {this.props.followButton ? <div className="suc-right">
                    <button onClick={this.followButtonClickHandle}
                            className={user.relations.is_follow ? "follow-button follow-button-active" : "follow-button"}>关注
                    </button>
                </div> : ''}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loginState: state.Account.state,
        personRefreshObj: state.Relation.personRefreshObj,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        personRelationsSet: bindActionCreators(RelationActions.personRelationsSet, dispatch),
        relationsRefreshDone: bindActionCreators(RelationActions.relationsRefreshDone, dispatch),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SimpleUserCard))



