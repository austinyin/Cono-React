import React,{Component} from 'react'
import './style.scss'



class TweetCard extends Component {
    constructor(props) {
        super(props);
        this.clickHandle = this.clickHandle.bind(this)
    }

    clickHandle(){
        this.props.clickFuncHandle(this.props.tweet.id)
    }

    render() {
        return(
            <div id="tweetCard" onClick={this.clickHandle}>
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