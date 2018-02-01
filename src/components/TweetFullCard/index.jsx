import React from 'react'
import './style.scss'

import SimpleUserCard from "src/components/SimpleUserCard";
import CommentCard from "src/components/CommentCard";

class TweetFullCard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.avatar = "src/assets/img/avatar/avatar.jpg"
    }

    render() {
        return(
            <section id="tweetFullCard" className="container-fluid">
                <header className="full-card-header">
                    <div className="w-100 h-100">
                        <SimpleUserCard
                            imgUrl={"src/assets/img/avatar/avatar.jpg"}
                            title={"monkey"}
                            subtitle={"amazing"}
                        />
                    </div>
                </header>
                <div className="image-slider">
                    <div className="slider-left-button">
                        <button>left</button>
                    </div>
                    <div className="img-con">
                        <img className="img-fluid" src={require("src/assets/img/tweets/tweet.jpg")} alt=""/>
                    </div>
                    <div className="slider-right-button">
                        <button>right</button>
                    </div>
                    <div className="slider-dots">
                        <ul>
                            <li>.</li>
                            <li>.</li>
                            <li>.</li>
                        </ul>
                    </div>
                </div>
                <CommentCard/>


            </section>
        )
    }
}

export default TweetFullCard