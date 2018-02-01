import React from 'react'

import Nav from 'components/Nav'
import './style.scss'
import TweetFullCard from "src/components/TweetFullCard";
import HomeRightBar from "src/Main/Home/HomeRightBar/HomeRightBar";


class Explore extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id="explore">
                <div className="explore-header">
                    <header>
                        <span>发现用户</span>
                        <a href=""><span>查看全部</span></a>
                    </header>
                    <div className="eh-slider">

                    </div>
                </div>
                <div className="explore-main">
                    <header>
                        <span>探索</span>
                    </header>
                    <div className="tweets-con">
                        <a href="">
                            <div>
                                <div className="img-con">
                                    <img src="" alt=""/>
                                </div>
                                <div className="img-cover">
                                    <span className="media-icon"/>
                                    <div className="middle-icons">
                                        <div className="m-icon-left">
                                            <span/>
                                            <span>1</span>
                                        </div>
                                        <div className="m-icon-right">
                                            <span/>
                                            <span>2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </a>

                    </div>
                </div>
            </div>

        )
    }
}

export default Explore