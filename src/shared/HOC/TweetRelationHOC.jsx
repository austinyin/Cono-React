import React from 'react'
import {bindActionCreators, compose} from "redux";
import * as RelationActions from "src/extra/Relation/actions";
import connect from "react-redux/es/connect/connect";
import {RefreshState, RefreshType} from "src/extra/Relation/model";
import {
    tweetCommentLeaveApi, tweetCommentNextPageApi, tweetCommentRemoveApi,
    tweetRelationsSetApi
} from "src/extra/Relation/api";
import {tweetCommentLeave} from "src/extra/Relation/actions";

const TweetRelationHOC = (WrappedComponent) => {
    return class TweetRelationHOC extends React.Component {
        constructor(props) {
            super(props);
            this.getMoreCommentFunc= this.getMoreCommentFunc.bind(this);
            this.tweetRelationFunc= this.tweetRelationFunc.bind(this);
            this.commentLeaveFunc= this.commentLeaveFunc.bind(this);
            this.commentRemoveFunc= this.commentRemoveFunc.bind(this);
            this.state = {
                refreshState: RefreshState.calm,
                tweet: null,
                comment: {
                    nowPage: 1,
                    comments: this.props.tweetData.comments
                },
            }
        }


        getMoreCommentFunc(){
            const {nowPage, comments} = this.state.comment
            const data = {
                tweetId:this.props.tweetData.id,
                page: nowPage+1,
            }
            tweetCommentNextPageApi(data).then(data => {
                comments.data = [...comments.data,...data.data]
                comments.hasNext = data.hasNext
                this.setState({
                    comment:{
                        nowPage: nowPage +1,
                        comments: comments
                    }
                })
            })
        }

        /**
         * 子组件中点击喜欢或收藏传输的type，后台先查找后将相应状态取反状态即可。
         * @param type
         */
        tweetRelationFunc(data) {
            this.tweetId = data.tweetId
            this.setState({
                refreshState: RefreshState.agitate
            }, () => {
                tweetRelationsSetApi(data).then(data => {
                    this.setState({
                        refreshState: RefreshState.calm,
                        tweet: data.tweet,
                    })
                })
            })
        }

        /**
         * 接收commentCard的留言函数，将更新状态refreshState设置为 agitate,
         * 派发留言action，开始更新。
         * @param data
         */
        commentLeaveFunc(data) {
            this.setState({
                refreshState: RefreshState.agitate
            }, () => {
                tweetCommentLeaveApi(data).then(data => {
                    const {tweet, comment} = data
                    const stateComment = Object.assign({},this.state.comment)
                    stateComment.nowPage += 1;
                    stateComment.comments.data = [...stateComment.comments.data,comment]
                    this.setState({
                        refreshState: RefreshState.calm,
                        tweet: tweet,
                        comment: stateComment
                    })
                })

            })
        }

        commentRemoveFunc(data) {
            this.setState({
                refreshState: RefreshState.agitate
            }, () =>{
                tweetCommentRemoveApi(data).then(data =>{
                    const stateComment = Object.assign({},this.state.comment)
                    stateComment.comments.data = stateComment.comments.data.filter((item) => {
                        return item.id !== data.commentId
                    });
                    this.setState({
                        comment: stateComment,
                        refreshState: RefreshState.calm
                    })
                })
            })
        }

        /**
         * 这部分是之前的过度设计。
         */
        // settleDown() {
        //     const settleDownTimer = setInterval(() => {
        //         this.refreshStateDetect(settleDownTimer)
        //     }, 1000)
        // }
        //
        // refreshStateDetect(settleDownTimer) {
        //     /**
        //      * refreshObj{key:{state:RefreshState}}
        //      * 每秒钟检测一次，如果reducer中succeeded action 完成了，则将更新状态refreshState设为calm
        //      * 并将state的tweetData设置为返回的新tweet，实现局部刷新。
        //      * setState 完成后告诉store已经刷新完毕，并清除定时器
        //      */
        //     const refreshObj = this.props.tweetRefreshObj
        //     const findKey = Object.keys(refreshObj).find(k => {
        //         return parseInt(k) === this.tweetId && refreshObj[k].state === RefreshState.agitate;
        //     })
        //     if (findKey) {
        //         const newTweet = refreshObj[findKey].tweet
        //         const newCommentItem = refreshObj[findKey].comment
        //         const stateComment = Object.assign({},this.state.comment)
        //         stateComment.nowPage += 1;
        //         stateComment.comments.data = [...stateComment.comments.data,newCommentItem]
        //         console.log('newTweet',newTweet)
        //         this.setState({
        //             refreshState: RefreshState.calm,
        //             tweet: newTweet,
        //             comment: stateComment
        //         }, () => {
        //             console.log('newStatecomment', this.state.comment)
        //             this.props.relationsRefreshDone({id: this.tweetId, type: RefreshType.tweet})
        //             clearInterval(settleDownTimer)
        //         })
        //     }
        //
        //     if (findKey) {
        //         const newTweet = refreshObj[findKey].tweet
        //         console.log('newTweet',newTweet)
        //         console.log('comment',refreshObj[findKey].comment)
        //         this.setState({
        //             refreshState: RefreshState.calm,
        //             tweet: newTweet
        //         }, () => {
        //             this.props.relationsRefreshDone({id: this.tweetId, type: RefreshType.tweet})
        //             clearInterval(settleDownTimer)
        //         })
        //     }
        // }

        render() {
            return (
                <WrappedComponent ref="wrapChild"
                                  {...this.props}
                                  HOCTweet={this.state.tweet}
                                  HOCComments={this.state.comment.comments}
                                  HOCGetMoreCommentFunc={this.getMoreCommentFunc}
                                  HOCRelationFunc={this.tweetRelationFunc}
                                  HOCCommentLeaveFunc={this.commentLeaveFunc}
                                  HOCCommentRemoveFunc={this.commentRemoveFunc}
                />
            )
        }
    }
};



function mapStateToProps(state) {
    return {
        tweetRefreshObj: state.Relation.tweetRefreshObj,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        tweetCommentLeave: bindActionCreators(RelationActions.tweetCommentLeave, dispatch),
        tweetCommentRemove: bindActionCreators(RelationActions.tweetCommentRemove, dispatch),
        tweetRelationsSet: bindActionCreators(RelationActions.tweetRelationsSet, dispatch),
        relationsRefreshDone: bindActionCreators(RelationActions.relationsRefreshDone, dispatch),
    }
}


export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    TweetRelationHOC,
)
