import React from 'react'
import './style.scss'



class TweetCard extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return(
            <div id="tweetCard">
                <div className="img-con">
                    <a href="">
                        <img src="" alt=""/>
                    </a>
                </div>
                <div className="img-cover">
                    <span className="media-icon"/>
                    <div className="middle-icons">
                        <div className="m-icon-left">
                            <span/>
                            <span>{this.props.tweet.total_like}</span>
                        </div>
                        <div className="m-icon-right">
                            <span/>
                            <span>{this.props.tweet.comments.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TweetCard