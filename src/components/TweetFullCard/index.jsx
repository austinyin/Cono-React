import React from 'react'
import './style.scss'

import SimpleUserCard from "src/components/SimpleUserCard";
import CommentCard from "src/components/CommentCard";
import {TweetFullCardType} from "./model";
import Slider from "../Slider";

class TweetFullCard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.avatar = "src/assets/img/avatar/avatar.jpg"

    }

    componentWillReceiveProps() {

    }

    componentDidMount() {
    }

    render() {
        if (this.props.data.hasOwnProperty('user')) {
            return (
                <section id="tweetFullCard" className={this.props.type === TweetFullCardType.dialog?"dialog-tweet-full-card": '' } >
                    {this.props.type === TweetFullCardType.dialog ?
                        <div className="image-slider-con image-slider-con-dialog">
                            <Slider showDots={false}/>
                        </div> : null
                    }
                    <div>
                        <header className="full-card-header ">
                            <div className="w-100 h-100">
                                <SimpleUserCard
                                    imgUrl={this.props.data.user.avatar ? this.props.data.user.avatar : "src/assets/img/avatar/avatar.jpg"}
                                    title={this.props.data.user.username}
                                />
                            </div>
                        </header>
                        {this.props.type === TweetFullCardType.common ?
                            <div className="image-slider-con">
                                <Slider/>
                            </div> : null
                        }
                        <CommentCard type={this.props.type} author={{name: this.props.data.user.username, text: this.props.data.text}}
                                     comments={this.props.data.comments}/>
                    </div>
                    }
                </section>
            )
        }
        return <div>haha</div>

    }
}

export default TweetFullCard