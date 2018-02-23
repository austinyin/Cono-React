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
                            imgWidth="50px"
                            imgHeight="50px"
                            imgUrl={"src/assets/img/avatar/avatar.jpg"}
                            user={this.props.loginUser}
                        />
                    </li>

                    <li className="streamer">
                        <span>快拍</span>
                        <a className="float-right"><span>全部播放</span></a>
                    </li>
                    {this.props.snapshotUserList.map((user, k) => {
                        return (
                            <li className="r-bar-recom">
                                <SimpleUserCard
                                    imgWidth="50px"
                                    imgHeight="50px"
                                    imgUrl={"src/assets/img/avatar/avatar.jpg"}
                                    user={user}
                                />
                            </li>
                        )
                    })}

                </ul>


            </div>

        )
    }
}

export default HomeRightBar