import React from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as DialogCenterActions from './actions'

import './style.scss'
import TweetFullCard from "../TweetFullCard";
import {TweetFullCardType} from "../TweetFullCard/model";


class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.dialogButtonsHide = this.dialogButtonsHide.bind(this);
        this.state = {
            dialogButtons: this.props.dialogButtons,
            tweetFullCard: this.props.tweetFullCard,
            pubCard: this.props.pubCard,

        }
    }

    init() {

    }

    componentDidMount() {
        this.init()
    }

    componentWillReceiveProps(nextProps) {
        // 将state 与redux 同步
        this.setState({
            dialogButtons: nextProps.dialogButtons,
            tweetFullCard: nextProps.tweetFullCard,
            pubCard: this.props.pubCard
        })
    }

    componentWillUnmount() {
        // 清空列表
        this.dialogResetAll()
    }

    dialogButtonsHide() {
        this.props.dialogDisplay({
            dialogButtons: false,
        });
    }

    render() {
        return (
            <div id="dialogCenter">
                {this.state.dialogButtons.visible ?
                    <div className="dialog-buttons-con">
                        <ul>
                            {this.props.dialogButtons.elems.map((v, k) => {
                                return <li>
                                    <button className="dialog-button" onClick={v.func}>{v.text}</button>
                                </li>
                            })}
                            <li>
                                <button className="dialog-button" onClick={this.dialogButtonsHide}>取消</button>
                            </li>
                        </ul>
                    </div>
                    : null
                }
                {(this.state.tweetFullCard.visible && this.state.tweetFullCard.data) ?
                    <div className="dialog-tweet-con">
                        <TweetFullCard type={TweetFullCardType.dialog} data={this.state.tweetFullCard.data}/>
                    </div>
                    : null
                }
                {(this.state.dialogButtons.visible || this.state.tweetFullCard.visible || this.state.pubCard.visible) ?
                    <div className="dialog-bac"/> : null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        dialogButtons: state.Dialog.dialogButtons,
        tweetFullCard: state.Dialog.tweetFullCard,
        pubCard: state.Dialog.pubCard,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dialogDisplay: bindActionCreators(DialogCenterActions.dialogDisplaySet, dispatch),
        dialogResetAll: bindActionCreators(DialogCenterActions.dialogResetAll, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dialog)
