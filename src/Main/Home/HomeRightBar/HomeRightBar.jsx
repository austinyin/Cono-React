import React from 'react'

import './style.scss'
import SimpleUserCard from "src/components/SimpleUserCard";


class HomeRightBar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id="homeRightBar">
                <ul>
                    <li className="r-bar-author">
                        <SimpleUserCard
                            imgUrl={"src/assets/img/avatar/avatar.jpg"}
                            title={"monkey"}
                        />
                    </li>
                    <li>
                        <span>快拍</span>
                        <a href=""><span>全部播放</span></a>
                    </li>
                    <li className="r-bar-recom">
                        <SimpleUserCard
                            imgUrl={"src/assets/img/avatar/avatar.jpg"}
                            title={"monkey"}
                        />
                    </li>
                    <li className="r-bar-author">
                        <SimpleUserCard
                            imgUrl={"src/assets/img/avatar/avatar.jpg"}
                            title={"monkey"}
                        />
                    </li>
                </ul>


            </div>

        )
    }
}

export default HomeRightBar