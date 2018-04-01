/**
 * 快照页面
 * 等待修复左右翻页功能
 */
import React from 'react'
import {connect} from "react-redux";
import withRouter from "react-router-dom/es/withRouter";

import './style.scss'
import SimpleUserCard from 'src/components/SimpleUserCard'
import {SnapshotTag} from "src/extra/Snapshot/style";
import {getSnapshotsApi} from "src/extra/Snapshot/api";
import {getUserInfoApi} from "src/Main/UserCenter/api";
import {MediaType} from "src/components/Dialog/constants";
import {SERVER_ROOT} from "src/shared/api";

class Snapshot extends React.Component {
    constructor(props) {
        super(props);
        this.userInit = this.userInit.bind(this)
        this.loopButtonClickHandle = this.loopButtonClickHandle.bind(this)
        this.next = this.next.bind(this)
        this.before = this.before.bind(this)
        this.runPlayProcess = this.runPlayProcess.bind(this)
        this.playImage = this.playImage.bind(this)
        this.startVideoProgress = this.startVideoProgress.bind(this)
        this.state = {
            user: null,
            nowMediaType: null,
            imageTiming: 3000, // 每张图片播放时长
            videoTiming: 500, // 视频progressBar刷新间隔
            nowImages: {list: [], nowIndex: null},
            nowVideo: null,
            mediaList: [],
            beforeMediaList: [],
            progressBar: {progress: 0}
        }
    }

    componentDidMount() {
        // 筛选出当前tweet的用户
        this.userInit();

        // 视频事件绑定
        const videoElem = this.refs.video
        videoElem.onended = this.next
        videoElem.onplaying = this.startVideoProgress // 视频播放则开启进度条.

        // 获取用户snapshot并setState后开启自动播放
        const username = this.props.match.params.user
        getSnapshotsApi(username).then(data => {
            this.setState({
                mediaList: data
            }, () => {
                this.next()
            })
        })
    }

    userInit() {
        const username = this.props.match.params.user
        getUserInfoApi(username).then(user => {
            this.setState({user})
        })
    }

    loopButtonClickHandle(e) {
        const eventClass = e.target.className;
        if (eventClass.includes('before')) {
            this.before()
        }
        if (eventClass.includes('after')) {
            this.next()
        }
    }


    next() {
        /**
         * 基础循环，每次从mediaList中取出数据，根据type作相应的处理，直到取尽为止。
         */
        const {mediaList, beforeMediaList} = this.state
        const item = mediaList.pop()

        if(!item){
            this.props.history.push('/')
            return
        }
        beforeMediaList.push(item)
        this.runPlayProcess(item)
    }

    before() {
        const {mediaList, beforeMediaList} = this.state
        const item = beforeMediaList.pop()
        if (item) {
            mediaList.push(item)
            this.runPlayProcess(item)
        }
    }

    runPlayProcess(item) {
        clearTimeout(this.playImageTimer)
        const {mediaList, beforeMediaList} = this.state
        if (item.type === MediaType.image) {
            this.setState({
                nowMediaType: item.type,
                nowImages: {
                    list: item.images,
                    nowIndex: 0
                }
            }, () => {
                this.playImageTimer = setTimeout(() => {
                    this.playImage(item)
                }, this.state.imageTiming)
            })
        }

        if (item.type === MediaType.video) {
            this.setState({
                nowMediaType: item.type,
                nowVideo: item.video,
            }, () => {
                this.refs.video.play();
            })
        }
    }


    playImage(list) {
        /**
         * 图片播放流
         * 如果播放完最后一张图片则跳出到基础播放流中，否则增加nowIndex后递归。
         */
        const nowImages = Object.assign(this.state.nowImages)
        if (nowImages.nowIndex < nowImages.list.length - 1) {
            nowImages.nowIndex += 1
            this.setState({
                nowImages: nowImages,
            }, () => {
                setTimeout(() => {
                    this.playImage(list)
                }, this.state.imageTiming)
            })
        } else {
            this.next()
        }
    }


    startVideoProgress() {
        /**
         * 视频进度条设置，通过获取当前视频播放时长的百分比来设置进度条。
         */
        clearInterval(this.videoPlayInterval)
        const videoDuration = this.refs.video.duration
        let count = 0
        const timing = this.state.videoTiming
        this.videoPlayInterval = setInterval(() => {
            if (count >= videoDuration) {
                clearInterval(this.videoPlayInterval)
            }

            count += timing / 1000
            this.setState({
                progressBar: {
                    progress: `${(count / videoDuration) * 100}%`
                }
            })
        }, timing)
    }

    render() {
        const {user,nowImages} = this.state
        const {list, nowIndex} = nowImages
        let imageSrc
        let videoSrc
        if (this.state.nowMediaType === MediaType.image) {
            imageSrc = list[nowIndex].image
        }
        if (this.state.nowMediaType === MediaType.video) {
            videoSrc = this.state.nowVideo.video
        }

        return (
            <SnapshotTag id="snapshot" className="container-fluid">
                <div className=" progress-bar-row">
                    <div className="col-10 col-md-7 col-lg-4">
                        <div className="user-wrapper">
                            {user&&(
                                <SimpleUserCard
                                    imgUrl={"src/shared/assets/img/avatar/avatar.jpg"}
                                    user={user}
                                />
                            )}
                        </div>
                        <div className="progress-bar-con ">
                            {/*视频进度条*/}
                            {this.state.nowMediaType === MediaType.image
                                ? (
                                    <div className="img-progress-bar-wrapper">
                                        {list.map((v, k) => {
                                            return (
                                                <span style={{width: `${(1 / list.length) * 100}%`}}
                                                      className={k === nowIndex ? "img-progress-bar img-progress-bar-active" : "img-progress-bar"}
                                                />
                                            )
                                        })}
                                    </div>
                                )
                                : (
                                    <div className="video-progress-bar-wrapper">
                                        <span className="video-progress-bar-active"
                                              style={{width: this.state.progressBar.progress}}/>
                                    </div>
                                )
                            }
                        </div>
                        <div className="media-con">
                            <img ref="img"
                                 style={{width: '100%',
                                     height:!imageSrc&&0
                                 }}
                                 src={`${SERVER_ROOT}${imageSrc}`}
                            />
                            <video id="myVideo" style={{width: '100%'}} className="video-ha" ref="video"
                                   src={`${SERVER_ROOT}${videoSrc}`}/>
                        </div>
                    </div>
                </div>
            </SnapshotTag>
        )
    }
}

function mapStateToProps(state) {
    return {
        tweetList: state.TweetList.tweetData,
    }
}

export default withRouter(connect(
    mapStateToProps,
    null
)(Snapshot))


