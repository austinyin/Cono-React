import React from 'react'
import PropTypes from 'prop-types';

import {TweetRelationType} from "src/extra/Relation/model";
import {TweetFullCardType} from "src/components/TweetFullCard/model";
import MultiSelect from "src/components/MultiSelect";
import {getMultiSelectValue} from "src/shared/js/commonUtil";
import Link from "react-router-dom/es/Link";
import {IconTypeToPosition, PositionIconTag} from "src/shared/styleJs/common/componentStyle";
import {CommentCardTag, SignIcon} from "src/components/TweetFullCard/CommentCard/Style";
import {ButtonIconTag} from "src/shared/styleJs/common/IconsStyle";
import closeIcon16 from 'src/assets/img/icon/close_black_16.png'
import UserMultiSelectHOC from "src/shared/HOC/UserMultiSelectHOC";
import withRouter from "react-router-dom/es/withRouter";

const FriendMultiSelect =  UserMultiSelectHOC(MultiSelect)

class CommentCard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.tweetRelationClickHandle = this.tweetRelationClickHandle.bind(this);
        this.answerClickHandle = this.answerClickHandle.bind(this);
        this.commentRemove = this.commentRemove.bind(this);
        this.signHandle = this.signHandle.bind(this);
        this.commentCommit = this.commentCommit.bind(this);
        this.state = {
            showSign: false
        }
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

    signHandle() {
        this.setState({
            showSign: !this.state.showSign
        })
    }

    commentCommit(e) {
        e.preventDefault()
        if (e.keyCode !== 13) {
            return
        }
        if(!this.props.loginUser.hasOwnProperty('id')){
            this.props.history.push('/account/login')
            return
        }
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
        const type = this.props.tweetType
        const comments = this.props.comments
        const relations = this.props.relations
        const author = this.props.author
        return (
            <CommentCardTag
                id="commentCard"
                type={type}
            >
                <header className="c-header">
                    <div className="c-header-top">
                        <div className="cht-left-icons">
                            <a>
                                <PositionIconTag
                                    active={relations && relations.is_like}
                                    type={IconTypeToPosition.like.type}
                                    onClick={this.tweetRelationClickHandle}
                                    className="like mr-3"
                                />
                            </a>
                            <a>
                                <PositionIconTag
                                    type={IconTypeToPosition.answer.type}
                                    onClick={this.answerClickHandle}
                                    className="collect"
                                />
                            </a>
                        </div>
                        <div className="cht-right-icons">
                            <a>
                                <PositionIconTag
                                    active={relations && relations.is_collect}
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
                        <li className="item author-item ">
                            <a href="" className="content-maker"><span className="">{author.name}</span></a>
                            <span className="item-content">
                                <p>
                                    {author.text}
                                    {this.props.signList.map((v, k) => <Link to={`/${v}`}>@{v}</Link>)}
                                </p>

                            </span>
                        </li>
                        {comments.hasNext ?
                            <li className="show-more-content"><a onClick={this.props.getMoreCommentFunc}>显示更多</a>
                            </li> : null
                        }
                        {comments.data.map((comment) => {
                            return (
                                <li className="item common-item" key={comment.id} id={`comment-${comment.id}`}>
                                    <a href="" className="content-maker"><span className=" ">{comment.user}</span></a>
                                    <span className="item-content">
                                        <p>
                                            {comment.text}
                                            {comment.sign_list.map((v, k) => <Link to={`/${v}`}>@{v}</Link>)}
                                        </p>

                                    </span>
                                    {this.props.loginUser.username === comment.user &&
                                    (
                                        <a href="" className="delete-item-button-con">
                                            <ButtonIconTag
                                                onClick={this.commentRemove}
                                                width="10px"
                                                height="10px"
                                                bacImage={closeIcon16}
                                                className="delete-comment-button"
                                            />
                                        </a>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="pub-time"><a>{this.props.pubTime}</a></div>
                <form ref="commentForm" className="comment-form">
                    <div className="input-con" style={{display: !this.state.showSign && 'none'}}>
                        <FriendMultiSelect inputOnKeyUp={this.commentCommit} ref="multiSelect"/>
                    </div>
                    <div className="input-con" style={{display: this.state.showSign && 'none'}}>
                        <input onKeyUp={this.commentCommit} ref="commentInput" placeholder="添加评论...  按Enter提交"/>
                    </div>

                    <SignIcon
                        className="sign-icon float-right"
                        onClick={this.signHandle}
                        active={this.state.showSign}
                    />
                </form>
            </CommentCardTag>

        )
    }
}

CommentCard.contextTypes = {
    TweetFullCardType: PropTypes.string.isRequired,
}

export default withRouter(CommentCard)