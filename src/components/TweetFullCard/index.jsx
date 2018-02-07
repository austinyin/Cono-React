import React,{Component,ReactPropTypes } from 'react'
import './style.scss'
import PropTypes from 'prop-types';


import SimpleUserCard from "src/components/SimpleUserCard";
import CommentCard from "src/components/CommentCard";
import {TweetFullCardType} from "./model";
import Slider from "../Slider";

class TweetFullCard extends Component {
    constructor(props, context) {
        super(props, context);
        this.avatar = "src/assets/img/avatar/avatar.jpg"
    }



    componentWillReceiveProps() {

    }

    componentDidMount() {
    }

    render() {
        const type = this.context.TweetFullCardType;
        if (this.props.data.hasOwnProperty('user')) {
            return (
                <section id="tweetFullCard" className={type === TweetFullCardType.dialog?
                    "dialog-tweet-full-card": '' }>
                    {type === TweetFullCardType.dialog
                        ? <div className="image-slider-con image-slider-con-dialog">
                            <Slider/>
                        </div> : null}
                    <div className="tweet-full-card-main">
                        <header className="full-card-header ">
                            <div className="w-100 h-100">
                                <SimpleUserCard
                                    imgUrl={this.props.data.user.avatar ? this.props.data.user.avatar : "src/assets/img/avatar/avatar.jpg"}
                                    title={this.props.data.user.username}
                                />
                            </div>
                        </header>
                        {type === TweetFullCardType.common ?
                            <div className="image-slider-con">
                                <Slider/>
                            </div> : null
                        }
                        <CommentCard author={{name: this.props.data.user.username, text: this.props.data.text}}
                                     comments={this.props.data.comments}/>

                    </div>
                </section>
            )
        }
        return <div>haha</div>
    }
}

TweetFullCard.contextTypes = {
    TweetFullCardType: PropTypes.string.isRequired,
}


export default TweetFullCard