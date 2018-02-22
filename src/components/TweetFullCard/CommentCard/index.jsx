import React from 'react'
import PropTypes from 'prop-types';

import './style.scss'
import {RefreshState, TweetRelationType} from "src/extra/Relation/model";
import {TweetFullCardType} from "src/components/TweetFullCard/model";
import MultiSelect from "src/components/MultiSelect";
import {getMultiSelectValue} from "src/shared/js/commonUtil";
import Link from "react-router-dom/es/Link";
import {IconTag, IconTypeToPosition} from "src/shared/styleJs/common/componentStyle";
import {CommentCardTag} from "src/components/TweetFullCard/CommentCard/Style.jsx";

const list = [
    {label: 'monkyin', value: 'monkyin'},
    {label: 'xiaobei', value: 'xiaobei'},
    {label: 'beibei', value: 'beibei'},

]

class CommentCard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.tweetRelationClickHandle = this.tweetRelationClickHandle.bind(this);
        this.answerClickHandle = this.answerClickHandle.bind(this);
        this.commentRemove = this.commentRemove.bind(this);
        this.commentCommit = this.commentCommit.bind(this);

    }

    tweetRelationClickHandle(e) {
        e.stopPropagation()
        if (e.target.className.includes('like')) {
            this.props.tweetRelationFunc(TweetRelationType.like)
        }
        else if (e.target.className.includes('collect')) {
            this.props.tweetRelationFunc(TweetRelationType.collect)
        }
    }

    answerClickHandle(e) {
        e.stopPropagation()
        this.refs.commentInput.focus()
    }

    commentCommit(e) {
        e.preventDefault()
        const selectedList = this.refs.multiSelect.state.selectedList
        const text = this.refs.commentInput.value;
        const signTargetList = getMultiSelectValue(selectedList)
        this.props.commentLeaveFunc(text, signTargetList)
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
        const comments = this.props.comments
        const relations = this.props.relations
        const author = this.props.author
        return (
            <div id="commentCard" className={type === TweetFullCardType.dialog && 'dialog-comment-card'}>
                <header className="c-header">
                    <div className="c-header-top">
                        <div className="cht-left-icons">
                            <a className={(relations && relations.is_like) && "like_active" }>
                                <IconTag
                                    type={IconTypeToPosition.like.type}
                                    onClick={this.tweetRelationClickHandle}
                                    className="like"
                                />
                            </a>
                            <a>
                                <IconTag
                                    type={IconTypeToPosition.answer.type}
                                    onClick={this.answerClickHandle}
                                    className="collect"
                                />
                            </a>
                        </div>
                        <div className="cht-right-icons">
                            <a className={(relations && relations.is_collect) && "collect_active" }>
                                <IconTag
                                    type={IconTypeToPosition.collect.type}
                                    onClick={this.tweetRelationClickHandle} className="collect"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="c-header-bottom">
                        <a href="">
                            <span>{this.props.totalLike}</span> 次赞
                        </a>
                    </div>
                </header>
                <div className="comment-items">
                    <ul>
                        <li className="item author-item">
                            <a href="" className="content-maker"><span className="">{author.name}</span></a>
                            <span className="item-content">
                                <p>{author.text}</p>
                                {this.props.signList.map((v, k) => <Link to={`/${v}`} className="img-con">@{v}</Link>)}
                            </span>
                        </li>
                        {comments.hasNext?
                            <li className="show-more-content"><a onClick={this.props.getMoreCommentFunc}>more</a></li>: null
                        }
                        {comments.data.map((comment) => {
                            return (
                                <li className="item common-item" key={comment.id} id={`comment-${comment.id}`}>
                                    <a href="" className="content-maker"><span className=" ">{comment.user}</span></a>
                                    <span className="item-content">
                                        <p>{comment.text}</p>
                                        {comment.sign_list.map((v, k) => <Link to={`/${v}`} className="img-con">@{v}</Link>)}
                                    </span>
                                    {this.props.loginUser.username === comment.user &&
                                    (
                                        <a href="" className="delete-item-button-con">
                                            <button onClick={this.commentRemove}>x</button>
                                        </a>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                    <div><a href="">{this.props.pubTime}</a></div>
                </div>
                <form ref="commentForm" className="comment-input-con">
                    <textarea ref="commentInput" name="" id="" cols="30" rows="1"/>
                    <span onClick={this.signHandle}>@</span>
                    <MultiSelect ref="multiSelect" itemList={list} selectedList={this.selectedList}/>
                    <button onClick={this.commentCommit}>提交</button>
                    <div className="comment-input-button-con">
                        <IconTag type={IconTypeToPosition.ellipsis.type}/>
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