import React, {Component} from 'react'
import './style.scss'
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


import SimpleUserCard from "src/components/SimpleUserCard";
import CommentCard from "src/components/TweetFullCard/CommentCard";
import Slider from "../Slider";
import * as RelationActions from "src/extra/Relation/actions";
import {RefreshState, RefreshType} from "src/extra/Relation/model";
import {TweetFullCardType} from "src/components/TweetFullCard/model";
import TweetRelationHOC from "src/shared/HOC/TweetRelationHOC";

class TweetFullCard extends Component {
    constructor(props) {
        super(props);
        this.tweetRelationFuncHandl = this.tweetRelationFuncHandl.bind(this);
        this.commentLeaveFuncHandl = this.commentLeaveFuncHandl.bind(this);
        this.commentRemoveFuncHandl = this.commentRemoveFuncHandl.bind(this);
        this.avatar = "src/assets/img/avatar/avatar.jpg"
        this.state = {
            refreshState: RefreshState.calm
        }
    }


    /**
     * 子组件中点击喜欢或收藏传输的type，后台先查找后将相应状态取反状态即可。
     * @param type
     */
    tweetRelationFuncHandl(type) {
        const data = {
            type,
            tweetId: this.props.data.id,
        }
        this.props.HOCRelationFunc(data)

    }

    /**
     * 接收commentCard的留言函数，将更新状态refreshState设置为 agitate,
     * 派发留言action，开始更新。
     * @param text
     */
    commentLeaveFuncHandl(text) {
        const data = {
            text: text,
            tweetId: this.props.data.id
        };
        this.props.HOCCommentLeaveFunc(data)

    }

    commentRemoveFuncHandl(id) {
        const data = {
            commentId: id,
            tweetId: this.props.data.id
        };
        this.props.HOCCommentRemoveFunc(data)

    }


    render() {
        const type = this.context.TweetFullCardType;
        // 如果进行了异步更改，将接收HOC返回的更改后的tweetData
        const tweetData = this.props.HOCTweet ? this.props.HOCTweet : this.props.data;
        const images = tweetData.images
        if (tweetData.hasOwnProperty('images')) {
            return (
                // 如果 type 为 TweetFullCardType.dialog
                <section id="tweetFullCard" className={type === TweetFullCardType.dialog ?
                    "dialog-tweet-full-card" : ''}>
                    {type === TweetFullCardType.dialog&& images ?
                        <div className="image-slider-con image-slider-con-dialog">
                            <Slider images={images}/>
                        </div> : null
                    }
                    <div className="tweet-full-card-main">
                        <header className="full-card-header ">
                            <div className="w-100 h-100">
                                <SimpleUserCard
                                    imgUrl={tweetData.user.avatar ? tweetData.user.avatar : "src/assets/img/avatar/avatar.jpg"}
                                    user={tweetData.user}
                                />
                            </div>
                        </header>
                        {type === TweetFullCardType.common && images ?
                            <div className="image-slider-con">
                                <Slider images={images}/>
                            </div> : null
                        }
                        <CommentCard commentLeaveFunc={this.commentLeaveFuncHandl}
                                     commentRemoveFunc={this.commentRemoveFuncHandl}
                                     tweetRelationFunc={this.tweetRelationFuncHandl}
                                     author={{name: tweetData.user.username, text: tweetData.text}}
                                     loginUser={this.props.loginUser}
                                     relations={tweetData.relations}
                                     comments={tweetData.comments}/>
                    </div>
                </section>
            )
        }
        return <div/>
    }
}

TweetFullCard.contextTypes = {
    TweetFullCardType: PropTypes.string.isRequired,
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


