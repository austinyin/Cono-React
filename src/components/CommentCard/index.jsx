import React from 'react'
import './style.scss'

class CommentCard extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id="commentCard">
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
                <div className="c-items">
                    <ul>
                        <li className="item author-item">
                            <a href="" className="content-maker"><span className="">author</span></a>
                            <span className="item-content">author contet</span>
                            <a href="" className="delete-item-button-con">
                                <button>x</button>
                            </a>
                        </li>
                        <li className="show-more-content"><a href="">more</a></li>
                        <li className="item common-item">
                            <a href="" className="content-maker"><span className=" ">author</span></a>
                            <span className="item-content">author content</span>
                            <a href="" className="delete-item-button-con">
                                <button>x</button>
                            </a>
                        </li>
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

export default CommentCard