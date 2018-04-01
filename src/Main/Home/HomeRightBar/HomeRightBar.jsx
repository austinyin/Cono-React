import React from 'react'

import './style.scss'
import SimpleUserCard from "src/components/SimpleUserCard";
import {SimpleUserCardType} from "src/components/SimpleUserCard/model";


class HomeRightBar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {loginUser,snapshotUserList} = this.props
        return (
            <div id="homeRightBar">
                <ul>
                    <li className="r-bar-author">
                        <SimpleUserCard
                            imgWidth="50px"
                            imgHeight="50px"
                            imgUrl={"src/shared/assets/img/avatar/avatar.jpg"}
                            user={loginUser}
                        />
                    </li>

                    <li className="streamer">
                        <span>快拍</span>
                        <a className="float-right"><span>全部播放</span></a>
                    </li>
                    {snapshotUserList.map((user, k) => {
                        return (loginUser.id!==user.id)&&(
                            <li className="r-bar-recom">
                                <SimpleUserCard
                                    imgWidth="50px"
                                    imgHeight="50px"
                                    imgUrl={"src/shared/assets/img/avatar/avatar.jpg"}
                                    user={user}
                                    type={SimpleUserCardType.snapshot}
                                    key={user.id}
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