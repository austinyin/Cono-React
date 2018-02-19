import React,{Component} from 'react'
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as DialogCenterActions from './actions'

import './style.scss'
import TweetFullCard from "../TweetFullCard";
import {TweetFullCardType} from "../TweetFullCard/model";
import PubCard from "src/components/Dialog/PubCard";
import {MediaType} from "src/components/Dialog/constants";


class Dialog extends Component {
    constructor(props) {
        super(props);

        this.pubCloseFuncHandl = this.pubCloseFuncHandl.bind(this);
        this.pubCommitFuncHandl = this.pubCommitFuncHandl.bind(this);
        this.transferUploadFuncHandl = this.transferUploadFuncHandl.bind(this);
        this.tranferRemoveFuncHandl = this.tranferRemoveFuncHandl.bind(this);
        this.dialogButtonsHide = this.dialogButtonsHide.bind(this);
        this.dialogHideAll = this.dialogHideAll.bind(this);

    }

    /**
     * 共享给所有子组件 TweetFullCardType， 让他们根据该值表现相应的的状态。
     * @returns {{TweetFullCardType: number}}
     */
    getChildContext() {
        return {TweetFullCardType: TweetFullCardType.dialog};
    }


    // 关闭dialogButtons弹窗
    dialogButtonsHide() {
        this.props.dialogDisplay({
            dialogButtons: false,
        });
    }

    // 接收傀儡组件的函数，派发清空中转站action, 并派发action隐藏pubCard。
    pubCloseFuncHandl() {
        this.props.pubTransferReset();
        this.props.dialogDisplay({
            pubCard:false
        })
    }

    dialogHideAll(){
        this.props.dialogDisplay({
            pubCard:false,
            dialogButtons:false,
            tweetFullCard:false,
        })
    }

    tranferRemoveFuncHandl(data){
        if(data.type===MediaType.image){
            this.props.pubTransferImageRemove(data.id)
        } else {
            this.props.pubTransferReset()
        }

    }

    /**
     * 接收来自pubCard组件的 Upload函数传来的data， 并派发action。
     * @param data
     */
    pubCommitFuncHandl(data){
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
        // this.props.dialogResetAll() 暂时禁用，因为在跳转路由后dialog组件的init不一定在最后进行。
    }

    componentDidMount() {
        this.init()
    }


    componentWillUnmount() {
        this.props.dialogResetAll()
        // 清空列表
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
                    {(dialogObj.tweetFullCard.visible && dialogObj.tweetFullCard.data.hasOwnProperty('id')) ?
                        <div className="dialog-tweet-con">
                            <TweetFullCard type={TweetFullCardType.dialog} tweetData={dialogObj.tweetFullCard.data}/>
                        </div> : null
                    }
                    {dialogObj.pubCard.visible?
                        <div className="pub-card-con">
                            <PubCard ref="pubCard"
                                     pubCardObj={dialogObj.pubCard}
                                     tranferUploadFunc={this.transferUploadFuncHandl}
                                     pubCommitFunc={this.pubCommitFuncHandl}
                                     closeFunc={this.pubCloseFuncHandl}
                                     tranferRemoveFunc={this.tranferRemoveFuncHandl}
                            />
                        </div> :null
                    }
                    <div onClick={this.dialogHideAll} className="dialog-bac"/>
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
        pubTransferImageRemove: bindActionCreators(DialogCenterActions.pubTransferImageRemove, dispatch),
        pubTransferReset: bindActionCreators(DialogCenterActions.pubTransferReset, dispatch),
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
