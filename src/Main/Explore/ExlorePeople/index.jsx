import React from 'react'

import Nav from 'components/Nav'
import './style.scss'
import TweetFullCard from "src/components/TweetFullCard";
import HomeRightBar from "src/Main/Home/HomeRightBar/HomeRightBar";


class ExlorePeople extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id="exlorePeople">
                <header>
                    <span>推荐</span>
                </header>
                <div className="recommends">
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </div>

        )
    }
}

export default ExlorePeople