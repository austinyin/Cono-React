/**
 * 这里的更多评论命名有点拗口，待解决
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import './style.scss'

import SimpleUserCard from "src/components/SimpleUserCard";
import CommentCard from "src/components/TweetFullCard/CommentCard";
import Slider from "../Slider";
import {RefreshState} from "src/extra/Relation/model";
import {TweetFullCardType} from "src/components/TweetFullCard/model";
import TweetRelationHOC from "src/shared/HOC/TweetRelationHOC";
import VideoCard from "src/components/VideoCard";
import {TweetFullCardTag} from "src/components/TweetFullCard/style";


class TweetFullCard extends React.Component {
    constructor(props) {
        super(props);
        this.getMoreCommentFuncHandl = this.getMoreCommentFuncHandl.bind(this);
        this.tweetRelationFuncHandl = this.tweetRelationFuncHandl.bind(this);
        this.commentLeaveFuncHandl = this.commentLeaveFuncHandl.bind(this);
        this.commentRemoveFuncHandl = this.commentRemoveFuncHandl.bind(this);
        this.avatar = "src/shared/assets/img/avatar/avatar.jpg"
        this.state = {
            refreshState: RefreshState.calm,
            comment: {
                nowPage: 1,
                comments: this.props.tweetData.comments
            },
        }
    }




    getMoreCommentFuncHandl() {
        this.props.HOCGetMoreCommentFunc()

    }

    /**
     * 子组件中点击喜欢或收藏传输的type，后台先查找后将相应状态取反状态即可。
     * @param type
     */
    tweetRelationFuncHandl(type) {
        const data = {
            type,
            tweetId: this.props.tweetData.id,
        }
        this.props.HOCRelationFunc(data)
    }

    /**
     * 接收commentCard的留言函数，将更新状态refreshState设置为 agitate,
     * 派发留言action，开始更新。
     * @param text
     */
    commentLeaveFuncHandl(text, signTargetList) {
        const data = {
            tweetId: this.props.tweetData.id,
            text,
            signTargetList
        };
        this.props.HOCCommentLeaveFunc(data)

    }

    commentRemoveFuncHandl(id) {
        const data = {
            commentId: id,
            tweetId: this.props.tweetData.id
        };
        this.props.HOCCommentRemoveFunc(data)
    }


    render() {
        const type =  this.context.TweetFullCardType===TweetFullCardType.dialog? this.props.type : this.context.TweetFullCardType

        // 如果进行了异步更改，将接收HOC返回的更改后的tweetData
        const tweetData = this.props.HOCTweet ? this.props.HOCTweet : this.props.tweetData;
        // const comments = this.state.comment.comments.hasOwnProperty('data') ? this.state.comment.comments: tweetData.comments
        const comments = this.props.HOCComments
        const images = tweetData.images
        const videoObj = tweetData.video
        let MediaElem = null
        if (images.length > 0) {
            MediaElem = <Slider images={images}/>
        } else {
            MediaElem = <VideoCard videoObj={videoObj}/>
        }

        if (tweetData.hasOwnProperty('images')) {
            return (
                // 如果 type 为 TweetFullCardType.dialog
                <TweetFullCardTag
                    id="tweetFullCard"
                    type={type}
                >
                    {type === TweetFullCardType.dialog &&(
                        <div className="media-con-dialog">
                            {MediaElem}
                        </div>
                    )}
                    <div className="tweet-full-card-main">
                        <header className="full-card-header ">
                            <div>
                                <SimpleUserCard
                                    imgUrl={tweetData.user.avatar ? tweetData.user.avatar : "src/shared/assets/img/avatar/avatar.jpg"}
                                    user={tweetData.user}
                                />
                            </div>
                        </header>
                        {type === TweetFullCardType.common &&(
                            <div className="media-con ">
                                {MediaElem}
                            </div>
                        )}

                        <CommentCard commentLeaveFunc={this.commentLeaveFuncHandl}
                                     commentRemoveFunc={this.commentRemoveFuncHandl}
                                     tweetRelationFunc={this.tweetRelationFuncHandl}
                                     getMoreCommentFunc={this.getMoreCommentFuncHandl}
                                     author={{name: tweetData.user.username, text: tweetData.text}}
                                     loginUser={this.props.loginUser}
                                     relations={tweetData.relations}
                                     comments={comments}
                                     hasNext={comments}
                                     totalLike={tweetData.total_like}
                                     pubTime={tweetData.create_time}
                                     signList={tweetData.sign_list}
                                     tweetType={type}
                        />
                    </div>
                </TweetFullCardTag>
            )
        }
        return <div/>
    }
}

TweetFullCard.contextTypes = {
    TweetFullCardType: PropTypes.number.isRequired,
};


function mapStateToProps(state) {
    return {
        loginUser: state.Account.user
    }
}


export default connect(
    mapStateToProps,
    null
)(TweetRelationHOC(TweetFullCard))


