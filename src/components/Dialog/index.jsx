import React,{Component} from 'react'
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as DialogCenterActions from './actions'

import './style.scss'
import TweetFullCard from "../TweetFullCard";
import {TweetFullCardType} from "../TweetFullCard/model";
import PubCard from "src/components/PubCard";


class Dialog extends Component {
    constructor(props) {
        super(props);
        this.dialogButtonsHide = this.dialogButtonsHide.bind(this);
        this.pubCardHide = this.pubCardHide.bind(this);
        this.state = {
            dialogObj: this.props.dialogObj,
        }
    }

    getChildContext() {
        return {TweetFullCardType: TweetFullCardType.dialog};
    }

    init() {

    }

    componentDidMount() {
        this.init()
    }

    componentWillReceiveProps(nextProps) {
        // 将state 与redux 同步
        this.setState({
            dialogObj: nextProps.dialogObj,
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

    pubCardHide() {
        this.props.dialogDisplay({
            pubCard: false,
        });
    }

    render() {
        const dialogObj = this.state.dialogObj
        if(dialogObj.dialogButtons.visible || dialogObj.tweetFullCard.visible || dialogObj.pubCard.visible){
            return (
                <div id="dialogCenter">
                    {dialogObj.dialogButtons.visible ?
                        <div className="dialog-buttons-con">
                            <ul>
                                {dialogObj.dialogButtons.elems.map((v, k) => {
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
                    {(dialogObj.tweetFullCard.visible && dialogObj.tweetFullCard.data) ?
                        <div className="dialog-tweet-con">
                            <TweetFullCard type={TweetFullCardType.dialog} data={dialogObj.tweetFullCard.data}/>
                        </div>

                        : null
                    }
                    {dialogObj.pubCard.visible?
                        <div className="pub-card-con">
                            <PubCard closeFuncHandl={this.pubCardHide}/>
                        </div> :null
                    }
                    <div className="dialog-bac"/> : null
                </div>
            )
        }
        return null

    }
}

function mapStateToProps(state) {
    return {
        dialogObj: state.Dialog,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dialogDisplay: bindActionCreators(DialogCenterActions.dialogDisplaySet, dispatch),
        dialogResetAll: bindActionCreators(DialogCenterActions.dialogResetAll, dispatch),
    }
}

Dialog.childContextTypes = {
    TweetFullCardType: PropTypes.string,
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dialog)
