import React from 'react'
import PropTypes from 'prop-types';

import './style.scss'
import {TweetFullCardType} from "../TweetFullCard/model";

class CommentCard extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const type = this.context.TweetFullCardType
        return (
            <div id="commentCard" className={type === TweetFullCardType.dialog? 'dialog-comment-card' : ''}>
                <header className="c-header">
                    <div className="c-header-top">
                        <div className="cht-left-icons">
                            <a href=""><span className="like"/>a</a>
                            <a href=""><span className="answer"/>b</a>
                        </div>
                        <div className="cht-right-icons">
                            <a href=""><span className="store"/>c</a>
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
                            <span  className="delete-item-button-con">
                                <button>x</button>
                            </span>
                        </li>
                        <li className="show-more-content"><a href="">more</a></li>
                        {this.props.comments.map((comment) => {
                            return (
                                <li className="item common-item" key={comment.id} id={`comment-${comment.id}`}>
                                    <a href="" className="content-maker"><span className=" ">{comment.user}</span></a>
                                    <span className="item-content">{comment.text}</span>
                                    {this.props.author.name === comment.user?
                                        <a href="" className="delete-item-button-con">
                                            <button>x</button>
                                        </a>
                                        : ""
                                    }
                                </li>
                            )
                        })}

                    </ul>
                    <div><a href="">15分钟前</a></div>
                </div>
                <form className="comment-input-con">
                    <textarea name="" id="" cols="30" rows="1"/>
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