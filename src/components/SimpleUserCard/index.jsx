/**
 * 标准用户卡片
 * 分为三个部分，第一部分为头像，用户名，全名，第二部分为内容描述，第三部分关注按钮,第一部分必须展示，第二三部分通过props来控制是否展示
 * 有横排显示和竖排显示两种模式,用过flex布局实现
 */
import React from 'react'
import Link from "react-router-dom/es/Link";
import withRouter from "react-router-dom/es/withRouter";
import RelationHOC from "src/shared/HOC/RelationHOC";
import {bindActionCreators} from "redux";
import * as RelationActions from "src/extra/Relation/actions";
import connect from "react-redux/es/connect/connect";
import {PersonUserRelationType} from "src/extra/Relation/model";
import {SimpleUserCardTag} from "src/components/SimpleUserCard/style";
import {CommonButtonTag} from "src/shared/styleJs/componentStyle";
import {SimpleUserCardType} from "src/components/SimpleUserCard/model";
import defaultAvatar from "src/shared/assets/img/avatar/default_avatar.jpg"

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
        const {user, type} = this.props
        let route_link

        if (type === SimpleUserCardType.common) {
            route_link = `/user/${user.username}`
        }
        if (type === SimpleUserCardType.snapshot) {
            route_link = `/snapshot/${user.username}`
        }


        // 首次显示采用父组件传入的user的relations,之后follow操作后由HOC返回。
        const relations = this.props.relations ? this.props.relations : this.props.user.relations
        return (
            <SimpleUserCardTag
                imgWidth={this.props.imgWidth}
                imgHeight={this.props.imgHeight}
                id="SimpleUserCard"
                className={this.props.verticle && 'd-flex flex-column'}
            >
                <div className={this.props.verticle ? 'd-flex flex-column suc-left' : 'suc-left'}>
                    <Link to={route_link} className="img-con">
                        <img className="img" src={user.avatar||defaultAvatar} onError={(e) => {e.target.src=defaultAvatar}}/>
                    </Link>
                    <Link to={route_link} className="infos-con">
                        <span ref="title" className="left-item left-title">{user.username}</span>
                        {this.props.showSubtitle && (
                            <span className="left-item left-subtitle">{user.fullname}</span>
                        )}
                    </Link>
                </div>
                {this.props.middle && <div className="suc-middle">middle</div>}
                {this.props.followButton && (
                    <div className="suc-right">
                        <CommonButtonTag
                            onClick={this.followButtonClickHandle}
                            active={relations.is_follow}
                        >{relations.is_follow ? "已关注" : "关注"}
                        </CommonButtonTag>
                    </div>
                )}
            </SimpleUserCardTag>
        )
    }
}

SimpleUserCard.defaultProps = {type: SimpleUserCardType.common};


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


