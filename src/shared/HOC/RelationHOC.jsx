import React from 'react'
import {bindActionCreators, compose} from "redux";
import * as RelationActions from "src/extra/Relation/actions";
import connect from "react-redux/es/connect/connect";
import {RefreshState, RefreshType} from "src/extra/Relation/model";
import {personRelationsSetApi, tweetRelationsSetApi} from "src/extra/Relation/api";

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
         *
         * @param data(targetId,type)
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
