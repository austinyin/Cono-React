import React from 'react'
import './style.scss'
import {getNoticeDescByType} from "src/components/Notices/model";
import connect from "react-redux/es/connect/connect";

class Notices extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }


    render() {
        const noticeList = this.props.loginUser.notices
        return (
            <div id="multiSelect">
                <ul>
                    {noticeList?noticeList.map((v,k) => {
                        const noticeData = getNoticeDescByType({
                            type: v.type,
                            obj: v.obj,
                        })
                        return <li className="notice-card">
                            <div className="notice-card-left notice-user">
                            <span className="avatar-con">
                                <img src={noticeData.avatar} alt=""/>
                            </span>
                                <span className="notice-username">
                                aaa
                            </span>
                            </div>
                            <div className="notice-card-center">
                                <p className="action-desc">
                                    {noticeData.actionDesc}
                                </p>
                                <span className="action-time"></span>
                            </div>
                            <div className="notice-card-right">
                                {noticeData.tweetThumbnail?
                                    <span className="tweet-thumnail-con">
                                        <img src={noticeData.tweetThumbnail} alt=""/>
                                    </span>:
                                    <button>关注</button>
                                }
                            </div>
                        </li>
                    }) : null}


                </ul>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        loginUser: state.Account.user
    }
}


export default connect(
    mapStateToProps,
    null
)(Notices)


