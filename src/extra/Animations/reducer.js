import * as actionTypes from "./constants";
import {stateChildOperByKey} from "src/shared/js/reducerUtils";
import {RefreshState, RefreshType} from "src/extra/Relation/model";

const initialState = {
    ribbon: {
        show:false
    },
};

export default function Relation(state = initialState, action) {
    switch (action.type) {
        /**
         * tweetRelation
         */
        case actionTypes.TWEET_RELATIONS_SET_SUCCEEDED:
            return stateChildOperByKey(state, 'tweetRefreshObj', {
                [action.data.tweet.id]: {
                    state: RefreshState.agitate,
                    tweet: action.data.tweet,
                    comment: action.data.comment
                }
            })

        default:
            return state
    }
}