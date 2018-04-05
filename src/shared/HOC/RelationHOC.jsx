/**
 * 用户关系设置高级组件
 * 代办: 改名UserRelationHOC
 */
import React from 'react'
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {RefreshState} from "src/extra/Relation/model";
import {personRelationsSetApi} from "src/extra/Relation/api";

const RelationHOC = (WrappedComponent) => {
    return class RelationHOC extends React.Component {
        constructor(props) {
            super(props);
            this.followHandle = this.followHandle.bind(this)
            this.state = {
                refreshState: RefreshState.calm,
                relations: this.props.targetUser.relations
            }
        }

        /**
         * 用户follow处理
         * 通过设置RefreshState 进行函数节流
         * @param data(targetId: number,type: string)
         */
        followHandle(data) {
            this.setState({
                refreshState: RefreshState.agitate
            }, () => {
                personRelationsSetApi(data).then(data => {
                    this.setState({
                        refreshState: RefreshState.calm,
                        relations: data.user.relations
                    })
                })
            })
        }

        render() {
            return (
                <WrappedComponent ref="wrapChild" {...this.props} relations={this.state.relations}
                                  HOCfollowHandle={this.followHandle}/>
            )
        }
    }
};

export function mapStateToProps(state) {
    return {
        targetUser: state.User.user,
        loginState: state.Account.state,
        // personRefreshObj: state.Relation.personRefreshObj,
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        // personRelationsSet: bindActionCreators(RelationActions.personRelationsSet, dispatch),
        // relationsRefreshDone: bindActionCreators(RelationActions.relationsRefreshDone, dispatch),
    }
}


export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    RelationHOC,
)
