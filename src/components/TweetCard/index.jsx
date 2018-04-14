/**
 * 推文卡片
 * 显示推文媒体类型，略缩图，喜欢的人数和评论人数
 */
import React from 'react'
import * as DialogActions from "../Dialog/actions";
import {tweetFullCardElemSet} from "../Dialog/actions";
import withRouter from "react-router-dom/es/withRouter";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {IconTypeToPosition, PositionIconTag} from "src/shared/styleJs/componentStyle";
import {TweetCardTag, TweetTypeIcon} from "src/components/TweetCard/style";
import RelationHOC from "src/shared/HOC/RelationHOC";


class TweetCard extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandle = this.clickHandle.bind(this)
    }

    clickHandle() {
        this.props.tweetFullCardElemSet(this.props.tweet.id)
        this.props.dialogDisplaySet({tweetFullCard: true})
    }

    componentDidMount() {
    }


    render() {
        const {tweet} = this.props

        let mediaType = null;
        if (tweet.images.length > 1) {
            mediaType = IconTypeToPosition.multiImages.type
        }
        if (tweet.video) {
            mediaType = IconTypeToPosition.camera.type
        }

        return (
            <TweetCardTag id="tweetCard" onClick={this.clickHandle}>
                <a className="tweet-card-wrapper">
                    <div className="img-con">
                        <img className="tweet-image" src={tweet.image_thumbnail.image} alt=""/>
                        {mediaType && (
                            <TweetTypeIcon
                                width="48px"
                                height="48px"
                                type={mediaType}
                                className="tweet-type-icon"
                            />
                        )}
                    </div>
                    <div className="img-cover">
                        <div className="img-cover-middle">
                            <div className="cover-middle-left">
                                <PositionIconTag
                                    type={IconTypeToPosition.like.type}
                                    fill={true.toString()}
                                />
                                <span className="tag-label">{tweet.total_like}</span>
                            </div>
                            <div className="cover-middle-right">
                                <PositionIconTag
                                    type={IconTypeToPosition.answer.type}
                                    fill={true.toString()}
                                />
                                <span className="tag-label">{tweet.comments.length || 0}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </TweetCardTag>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        dialogDisplaySet: bindActionCreators(DialogActions.dialogDisplaySet, dispatch),
        tweetFullCardElemSet: bindActionCreators(tweetFullCardElemSet, dispatch),
    }
}

export default withRouter(connect(
    null,
    mapDispatchToProps
)(RelationHOC(TweetCard)))




