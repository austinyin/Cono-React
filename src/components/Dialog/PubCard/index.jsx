/**
 * 推文发布卡片
 * 媒体,点击左侧发布图片,右侧发布视频
 * 可以添加描述和圈出好友
 */
import React, {Component} from 'react'

import {PubInputClassToRefs} from "src/components/Dialog/PubCard/model";
import {MediaType, UploadState} from "src/components/Dialog/constants";
import VideoCard from "src/components/VideoCard";
import MultiSelect from "src/components/MultiSelect";
import {getMultiSelectValue} from "src/shared/js/commonUtil";
import {PubCardTag} from "src/components/Dialog/PubCard/style";
import {SignIcon} from "src/components/TweetFullCard/CommentCard/Style";
import {ButtonIconTag} from "src/shared/styleJs/common/IconsStyle";

import uploadRemoveIcon from 'src/shared/assets/img/icon/upload_remove_icon.png'
import UserMultiSelectHOC from "src/shared/HOC/UserMultiSelectHOC";
import {SERVER_ROOT} from "src/shared/api";


const FriendMultiSelect = UserMultiSelectHOC(MultiSelect)


class PubCard extends Component {
    constructor(props) {
        super(props);
        this.signHandle = this.signHandle.bind(this);
        this.upFileHandl = this.upFileHandl.bind(this);
        this.fileInputChangeHandl = this.fileInputChangeHandl.bind(this);
        this.uploadCommitHandl = this.uploadCommitHandl.bind(this);
        this.tranferRemove = this.tranferRemove.bind(this);
        // 传入<FriendMultiSelect/> 用于接收@的对象列表
        this.selectedList = []
        this.state = {
            showSign: false
        }
    }

    signHandle() {
        this.setState({
            showSign: !this.state.showSign
        })
    }

    upFileHandl(e) {
        const eventClass = e.target.className;
        // 根据对应关系找到input并打开。
        this.setState({
            uploadType: eventClass === 'pub-main-image' ? MediaType.image : MediaType.video,
        }, () => {
            this.refs[PubInputClassToRefs[eventClass]].click();
        })
    }

    // 检测文件input的value变化
    fileInputChangeHandl(e) {
        // 新建formData, 传给父组件.
        if (e.target.value) {
            const formData = new FormData(this.refs.pubForm);
            formData.append('file', e.target.files[0]);
            this.props.tranferUploadFunc(formData)
        }
    }

    tranferRemove(e) {
        const data = {
            type: e.target.className.includes('video') ? MediaType.video : MediaType.image,
            id: e.target.previousElementSibling.id
        }
        this.props.tranferRemoveFunc(data)
    }

    // 提交表单的最后行为
    uploadCommitHandl() {
        const selectedList = this.selectedList
        const data = {
            text: this.refs.pubTextInput.value,
            signTargetList: getMultiSelectValue(selectedList)
        };
        this.props.pubCommitFunc(data)
    }

    render() {
        const pubCardObj = this.props.pubCardObj
        console.log('pubCardObj', pubCardObj);
        const images = pubCardObj.transferObj.images
        const videoObj = pubCardObj.transferObj.video

        // 根据数据判断显示图片还是视频
        let MediaElem = null
        if (images && images.length > 0) {
            MediaElem = images.map((v, k) => {
                return (
                    <li key={v} className="pub-elem">
                        <img id={v.id} className="pub-display-image"
                             src={v.image.includes('http') ? v.image : `${SERVER_ROOT}${v.image}`} alt=""/>
                        <ButtonIconTag
                            onClick={this.tranferRemove}
                            className="image-delete-icon"
                            width="21px"
                            height="21px"
                            bacImage={uploadRemoveIcon}
                        />
                    </li>
                )
            })
        }
        else {
            MediaElem = <li className="pub-elem">
                <VideoCard videoObj={videoObj}/>
                <ButtonIconTag
                    onClick={this.tranferRemove}
                    className="video-delete-icon"
                    bacImage={uploadRemoveIcon}
                />
            </li>
        }

        return pubCardObj && pubCardObj.state && (
            <PubCardTag id="pubCard">
                <header className="header">在这里发布</header>
                <div className="pub-main">
                    {/*有文件后则跳转可编辑状态*/}
                    {pubCardObj.state === UploadState.before ?
                        <div className="pub-selections">
                            <a onClick={this.upFileHandl} className="pub-main-image">
                                <div className="pub-icon-con"><span className="pub-icon-image"/></div>
                                <div>
                                    <span>上传图片</span>
                                </div>
                            </a>
                            <a onClick={this.upFileHandl} className="pub-main-video">
                                <div className="pub-icon-con"><span className="pub-icon-video"/></div>
                                <div>
                                    <span>上传视频</span>
                                </div>
                            </a>
                            <form className="pub-form" ref="pubForm" action="">
                                <input ref="imageInput" onChange={this.fileInputChangeHandl} className="image-input"
                                       type="file"/>
                                <input ref="videoInput" onChange={this.fileInputChangeHandl} className="video-input"
                                       type="file"/>
                            </form>

                        </div>
                        : <div className="pub-display">
                            <div className="pub-medias">
                                <ul>
                                    {MediaElem}
                                </ul>
                            </div>
                            <div>
                                {/*继续上传按钮只有在上传图片时显示*/}
                                {this.state.uploadType === MediaType.image && (
                                    <div className="add-image-input-wrapper"
                                         onClick={() => this.refs.addImageInput.click()}>
                                        <span>添加图片</span>
                                        <input ref="addImageInput" className="add-image-input"
                                               onChange={this.fileInputChangeHandl} type="file"/>
                                    </div>
                                )}

                            </div>
                            <div className="pub-describe">
                                <textarea
                                    ref="pubTextInput"
                                    className="textArea"
                                    style={{display: this.state.showSign && 'none'}}
                                    placeholder="请在这里输入文字"
                                />
                                <div style={{display: !this.state.showSign && 'none'}}>
                                    <FriendMultiSelect
                                        ref={x => this.multiSelect = x}
                                        selectedList={this.selectedList}
                                    />
                                </div>

                                <SignIcon
                                    className="sign-icon"
                                    onClick={this.signHandle}
                                    active={this.state.showSign}
                                />

                            </div>
                        </div>
                    }

                </div>
                <footer className="footer">
                    <div className="footer-left-button-con">
                        <button onClick={this.props.closeFunc}>关闭</button>
                    </div>
                    <div className="footer-right-button-con">
                        <button onClick={this.uploadCommitHandl}>发帖</button>
                    </div>
                </footer>
            </PubCardTag>
        )
    }
}


export default PubCard


