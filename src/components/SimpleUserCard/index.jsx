import React from 'react'
import './style.scss'
import Link from "react-router-dom/es/Link";
import withRouter from "react-router-dom/es/withRouter";
import RelationHOC from "src/shared/HOC/RelationHOC";
import {bindActionCreators} from "redux";
import * as RelationActions from "src/extra/Relation/actions";
import connect from "react-redux/es/connect/connect";
import {PersonUserRelationType} from "src/extra/Relation/model";

class SimpleUserCard extends React.Component {
    constructor(props) {
        super(props);
        this.followButtonClickHandle = this.followButtonClickHandle.bind(this);
    }

    followButtonClickHandle(e) {
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

    render() {
        //这里是RelationHOC的state中的user
        const user = this.props.user
        // 首次显示采用父组件传入的user的relations,之后follow操作后由HOC返回。
        const relations = this.props.relations ? this.props.relations : this.props.user.relations
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
                            className={relations.is_follow ? "follow-button follow-button-active" : "follow-button"}>关注
                    </button>
                </div> : null}
            </div>
        )
    }
}


export function mapStateToProps(state) {
    return {
        loginState: state.Account.state,
        loginUser: state.Account.user,
        personRefreshObj: state.Relation.personRefreshObj,
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        personRelationsSet: bindActionCreators(RelationActions.personRelationsSet, dispatch),
        relationsRefreshDone: bindActionCreators(RelationActions.relationsRefreshDone, dispatch),
    }
}


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(RelationHOC(SimpleUserCard)))


