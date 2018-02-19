import React, {Component} from 'react'
import './style.scss'
import * as DialogActions from "../Dialog/actions";
import {tweetFullCardElemSet} from "../Dialog/actions";
import withRouter from "react-router-dom/es/withRouter";
import {bindActionCreators} from "redux";
import ScrollRelationHOC from "../../shared/HOC/ScrollRelationHOC";
import connect from "react-redux/es/connect/connect";


class TweetCard extends Component {
    constructor(props) {
        super(props);
        this.clickHandle = this.clickHandle.bind(this)
    }

    clickHandle() {
        this.props.tweetFullCardElemSet(this.props.tweet.id)
        this.props.dialogDisplaySet({tweetFullCard: true})
    }

    render() {
        return (
            <div id="tweetCard" onClick={this.clickHandle}>
                <div className="img-con">
                    <a href="">
                        <img src="" alt=""/>
                    </a>
                </div>
                <div className="img-cover">
                    <span className="media-icon"/>
                    <div className="middle-icons">
                        <div className="m-icon-left">
                            <span/>
                            <span>{this.props.tweet.total_like}</span>
                        </div>
                        <div className="m-icon-right">
                            <span/>
                            <span>{this.props.tweet.comments.length}</span>
                        </div>
                    </div>
                </div>
            </div>
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
)(ScrollRelationHOC(TweetCard)))




