import React,{Component} from 'react'
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as DialogCenterActions from './actions'

import './style.scss'
import TweetFullCard from "../TweetFullCard";
import {TweetFullCardType} from "../TweetFullCard/model";
import PubCard from "src/components/PubCard";
import {UploadType} from "src/components/Dialog/constants";


class Dialog extends Component {
    constructor(props) {
        super(props);
        this.dialogButtonsHide = this.dialogButtonsHide.bind(this);
        this.pubCardHide = this.pubCardHide.bind(this);
        this.uploadFuncHandl = this.uploadFuncHandl.bind(this);
        this.transferUploadFuncHandl = this.transferUploadFuncHandl.bind(this);
        this.state = {
            dialogObj: this.props.dialogObj,
        }
    }

    /**
     * 共享给所有子组件 TweetFullCardType， 让他们根据该值表现相应的的状态。
     * @returns {{TweetFullCardType: number}}
     */
    getChildContext() {
        return {TweetFullCardType: TweetFullCardType.dialog};
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

    /**
     * 接收来自pubCard组件的 Upload函数传来的data， 并派发action。
     * @param data
     */
    uploadFuncHandl(data){
        this.props.pubUpload(data)
    }

    /**
     * 接收来自pubCard组件的 transferUpload函数传来的data， 并派发action。
     * @param data
     */
    transferUploadFuncHandl(data){
        this.props.pubTransferUpload(data)
    }

    init() {

    }

    componentDidMount() {
        this.init()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dialogObj: this.props.dialogObj,
        })
    }

    componentWillUnmount() {
        // 清空列表
        this.dialogResetAll()
    }




    render() {
        const dialogObj = this.props.dialogObj;
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
                            <PubCard ref="pubCard"   pubCardObj={dialogObj.pubCard} tranferUploadFunc={this.transferUploadFuncHandl}  uploadFunc={this.uploadFuncHandl} closeFuncHandl={this.pubCardHide}/>
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
        pubTransferUpload: bindActionCreators(DialogCenterActions.pubTransferUpload, dispatch),
        pubUpload: bindActionCreators(DialogCenterActions.pubUpload, dispatch),
    }
}

Dialog.childContextTypes = {
    TweetFullCardType: PropTypes.string,
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dialog)
