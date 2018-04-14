/**
 * 最近消息
 */
import React from 'react'
import {getNoticeDescByType} from "src/components/Nav/Notices/model";
import connect from "react-redux/es/connect/connect";
import {NotecesTag} from "src/components/Nav/Notices/style";
import {CommonButtonTag} from "src/shared/styleJs/componentStyle";
import {PersonUserRelationType} from "src/extra/Relation/model";
import RelationHOC from "src/shared/HOC/RelationHOC";

class Notices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeList: []
        }
    }

    followClickHandle(target_id) {
        /**
         * 将follow流程交给HOC
         */
        const data = {
            targetId: target_id,
            type: PersonUserRelationType.follow,
        }
        this.props.HOCfollowHandle(data)
    }


    render() {
        const noticeList = this.props.loginUser.notices
        return (
            <NotecesTag>
                <ul>
                    {noticeList && noticeList.map((v, k) => {
                        const noticeData = getNoticeDescByType({
                            type: v.type,
                            obj: v.obj,
                        })
                        return (
                            <li className="notice-card container-fluid" key={k}>
                                <div className="row">
                                    <div className="notice-card-left notice-user col-4 col-sm-3">
                                        <span className="avatar-con">
                                            <img src={noticeData.avatar} alt=""/>
                                        </span>
                                        <span className="notice-username">
                                            {noticeData.username}
                                        </span>
                                    </div>
                                    <div className="notice-card-center col-8 col-sm-6 row">
                                        <p className="action-desc col-8">
                                            {noticeData.actionDesc}
                                        </p>
                                        <span className="action-time offset-1 col-3">{noticeData.time}</span>
                                    </div>
                                    <div className="notice-card-right col-3 d-none d-sm-flex">
                                        {noticeData.tweetThumbnail ? (
                                                <span className="tweet-thumnail-con">
                                                <img src={noticeData.tweetThumbnail} alt=""/>
                                            </span>
                                            )
                                            : (
                                                <CommonButtonTag
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        this.followClickHandle(noticeData.id && noticeData.id)
                                                        noticeData.relations.is_follow = !noticeData.relations.is_follow
                                                    }}
                                                    style={{verticalAlign: "middle"}}
                                                    active={noticeData.relations && noticeData.relations.is_follow}
                                                >
                                                    {noticeData.relations && noticeData.relations.is_follow ? "已关注" : "关注"}
                                                </CommonButtonTag>
                                            )
                                        }
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </NotecesTag>
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
)(RelationHOC(Notices))


