import React, {Component} from 'react'
import './style.scss'
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


import SimpleUserCard from "src/components/SimpleUserCard";
import CommentCard from "src/components/TweetFullCard/CommentCard";
import Slider from "../Slider";
import * as RelationActions from "src/Relation/actions";
import {TweetRefreshState,TweetRelationType} from "src/Relation/model";
import {TweetFullCardType} from "src/components/TweetFullCard/model";

class TweetFullCard extends Component {
    constructor(props, context) {
        super(props, context);
        this.init = this.init.bind(this);
        this.tweetRelationFuncHandl = this.tweetRelationFuncHandl.bind(this);
        this.commentLeaveFuncHandl = this.commentLeaveFuncHandl.bind(this);
        this.commentRemoveFuncHandl = this.commentRemoveFuncHandl.bind(this);
        this.avatar = "src/assets/img/avatar/avatar.jpg"
        this.state = {
            tweetData: this.props.data,
            refreshState: TweetRefreshState.calm
        }
    }


    /**
     * 子组件中点击喜欢或收藏传输的type，后台先查找后将相应状态取反状态即可。
     * @param type
     */
    tweetRelationFuncHandl(type){
        console.log('tweetRelationFuncHandl')
        const data = {
            type,
            tweetId: this.state.tweetData.id,
        };
        this.setState({
            refreshState: TweetRefreshState.agitate
        }, () => {
            this.props.tweetRelationsSet(data)
            this.settleDown()
        })

    }

    /**
     * 接收commentCard的留言函数，将更新状态refreshState设置为 agitate,
     * 派发留言action，开始更新。
     * @param text
     */
    commentLeaveFuncHandl(text) {
        const data = {
            text: text,
            tweetId: this.state.tweetData.id
        };
        this.setState({
            refreshState: TweetRefreshState.agitate
        }, () => {
            this.props.tweetCommentLeave(data)
            this.settleDown()
        })
    }

    commentRemoveFuncHandl(id) {
        const data = {
            commentId: id,
            tweetId: this.state.tweetData.id
        };
        this.setState({
            refreshState: TweetRefreshState.agitate
        }, () => {
            this.props.tweetCommentRemove(data)
            this.settleDown()
        })
    }

    /**
     * 每秒钟检测一次，如果reducer中succeeded action 完成了，则将更新状态refreshState设为calm
     * 并将state的tweetData设置为返回的新tweet，实现局部刷新。
     * setState 完成后告诉store已经刷新完毕，并清除定时器
     */
    refreshStateDetect(settleDownTimer) {
        const selfId = this.state.tweetData.id
        const refreshList = this.props.refreshList
        const findKey = Object.keys(refreshList).find(k => {
            return parseInt(k) === selfId&&refreshList[k].state===TweetRefreshState.agitate;
        })
        if(findKey){
            const newTweetData = refreshList[findKey].data
            this.setState({
                refreshState: TweetRefreshState.calm,
                tweetData: newTweetData
            }, () => {
                this.props.relationsRefreshDone({id: selfId})
                clearInterval(settleDownTimer)
            })
        }
    }


    settleDown() {
        const settleDownTimer = setInterval(() =>{
            this.refreshStateDetect(settleDownTimer)
        },1000)
    }

    init(){

    }
    componentDidMount() {
        this.init()
    }

    render() {
        const type = this.context.TweetFullCardType;
        const tweetData = this.state.tweetData;
        if (tweetData.hasOwnProperty('id')) {
            return (
                // 如果 type 为 TweetFullCardType.dialog
                <section id="tweetFullCard" className={type === TweetFullCardType.dialog ?
                    "dialog-tweet-full-card" : ''}>
                    {type === TweetFullCardType.dialog ?
                        <div className="image-slider-con image-slider-con-dialog">
                            <Slider/>
                        </div> : null
                    }
                    <div className="tweet-full-card-main">
                        <header className="full-card-header ">
                            <div className="w-100 h-100">
                                <SimpleUserCard
                                    imgUrl={tweetData.user.avatar ? tweetData.user.avatar : "src/assets/img/avatar/avatar.jpg"}
                                    title={tweetData.user.username}
                                />
                            </div>
                        </header>
                        {type === TweetFullCardType.common ?
                            <div className="image-slider-con">
                                <Slider/>
                            </div> : null
                        }
                        <CommentCard commentLeaveFunc={this.commentLeaveFuncHandl}
                                     commentRemoveFunc={this.commentRemoveFuncHandl}
                                     tweetRelationFunc={this.tweetRelationFuncHandl}
                                     author={{name: tweetData.user.username, text: tweetData.text}}
                                     loginUser={this.props.loginUser}
                                     relations={tweetData.relations}
                                     comments={tweetData.comments}/>
                    </div>
                    {this.state.refreshState === TweetRefreshState.agitate ?
                        <div>agitae</div>
                        : <div>calm</div>
                    }
                </section>
            )
        }
        return <div/>
    }
}

TweetFullCard.contextTypes = {
    TweetFullCardType: PropTypes.string.isRequired,
};


function mapStateToProps(state) {
    return {
        refreshList: state.Relation.refreshList,
        loginUser: state.Account.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        tweetCommentLeave: bindActionCreators(RelationActions.tweetCommentLeave, dispatch),
        tweetCommentRemove: bindActionCreators(RelationActions.tweetCommentRemove, dispatch),
        tweetRelationsSet: bindActionCreators(RelationActions.tweetRelationsSet, dispatch),
        relationsRefreshDone: bindActionCreators(RelationActions.relationsRefreshDone, dispatch),

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TweetFullCard)


