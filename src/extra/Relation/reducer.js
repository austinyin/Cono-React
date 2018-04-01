import * as actionTypes from "./constants";
import {stateChildOperByKey} from "src/shared/js/reducerUtils";
import {RelationState, RefreshState, RefreshType} from "src/extra/Relation/model";

const initialState = {
    tweetRefreshObj: {},
    personRefreshObj: {}
};

export default function Relation(state = initialState, action) {
    switch (action.type) {
        /**
         * tweetRelation
         */
        case actionTypes.TWEET_COMMENT_LEAVE_SUCCEEDED:
        case actionTypes.TWEET_COMMENT_REMOVE_SUCCEEDED:
        case actionTypes.TWEET_RELATIONS_SET_SUCCEEDED:
            return stateChildOperByKey(state, 'tweetRefreshObj', {
                [action.data.tweet.id]: {
                    state: RefreshState.agitate,
                    tweet: action.data.tweet,
                    comment: action.data.comment
                }
            })
        /**
         * userRelation
         */
        case actionTypes.PERSON_RELATIONS_SET_SUCCEEDED:
            return stateChildOperByKey(state, 'personRefreshObj', {
                [action.data.user.id]: {
                    state: RefreshState.agitate,
                    data: action.data.user
                }
            })

        case actionTypes.RELATIONS_REFRESH_DONE:
            return stateChildOperByKey(state,
                action.data.type === RefreshType.tweet ? 'tweetRefreshObj' : 'personRefreshObj ',
                {[action.data.id]: {state: RefreshState.calm}})
        default:
            return state
    }
}