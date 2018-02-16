import React from 'react'
import PropTypes from 'prop-types';

import './style.scss'
import {RefreshState,TweetRelationType} from "src/extra/Relation/model";
import {TweetFullCardType} from "src/components/TweetFullCard/model";

class CommentCard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.tweetRelationClickHandle = this.tweetRelationClickHandle.bind(this);
        this.answerClickHandle = this.answerClickHandle.bind(this);
        this.commentRemove = this.commentRemove.bind(this);
        this.commentCommit = this.commentCommit.bind(this);
    }

    tweetRelationClickHandle(e){
        e.stopPropagation()
        if(e.target.className.includes('like')){
            this.props.tweetRelationFunc(TweetRelationType.like)
        }
        else if(e.target.className.includes('collect')){
            this.props.tweetRelationFunc(TweetRelationType.collect)
        }
    }

    answerClickHandle(e){
        e.stopPropagation()
        this.refs.commentInput.focus()

    }

    commentCommit(e) {
        e.preventDefault()
        const text = this.refs.commentInput.value;
        this.props.commentLeaveFunc(text)

    }

    commentRemove(e) {
        e.preventDefault()
        const id = e.target.parentNode.parentNode.id;
        if (id.includes('comment')) {
            // 取id中的数字部分，即commentId
            const intId = parseInt(id.replace(/[^0-9]/ig, ""))
            this.props.commentRemoveFunc(intId)
        }
    }


    render() {
        const type = this.context.TweetFullCardType
        return (
            <div id="commentCard" className={type === TweetFullCardType.dialog ? 'dialog-comment-card' : ''}>
                <header className="c-header">
                    <div className="c-header-top">
                        <div className="cht-left-icons">
                            <a className={(this.props.relations&&this.props.relations.is_like)? "like_active" : ""}><span onClick={this.tweetRelationClickHandle} className="like">a</span></a>
                            <a><span onClick={this.answerClickHandle} className="answer">b</span></a>
                        </div>
                        <div className="cht-right-icons">
                            <a className={(this.props.relations&&this.props.relations.is_collect)? "collect_active" : ""}><span onClick={this.tweetRelationClickHandle} className="collect">c</span></a>
                        </div>
                    </div>
                    <div className="c-header-bottom">
                        <a href="">
                            <span>39552</span> 次赞
                        </a>
                    </div>
                </header>
                <div className="comment-items">
                    <ul>
                        <li className="item author-item">
                            <a href="" className="content-maker"><span className="">{this.props.author.name}</span></a>
                            <span className="item-content">{this.props.author.text}</span>
                        </li>
                        <li className="show-more-content"><a href="">more</a></li>
                        {this.props.comments.map((comment) => {
                            return (
                                <li className="item common-item" key={comment.id} id={`comment-${comment.id}`}>
                                    <a href="" className="content-maker"><span className=" ">{comment.user}</span></a>
                                    <span className="item-content">{comment.text}</span>
                                    {this.props.loginUser.username === comment.user ?
                                        <a href="" className="delete-item-button-con">
                                            <button onClick={this.commentRemove}>x</button>
                                        </a>
                                        : ""
                                    }
                                </li>
                            )
                        })}
                    </ul>
                    <div><a href="">15分钟前</a></div>
                </div>
                <form ref="commentForm" className="comment-input-con">
                    <textarea ref="commentInput" name="" id="" cols="30" rows="1"/>
                    <button onClick={this.commentCommit}>提交</button>
                    <div className="comment-input-button-con">
                        <button>...</button>
                    </div>
                </form>
            </div>

        )
    }
}

CommentCard.contextTypes = {
    TweetFullCardType: PropTypes.string.isRequired,
}

export default CommentCard