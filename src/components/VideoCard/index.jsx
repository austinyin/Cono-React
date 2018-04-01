import React from 'react'
import './style.scss'
import {IconTypeToPosition} from "src/shared/styleJs/common/componentStyle";
import {VideoCardIconTag} from "src/components/VideoCard/style.js";
import {VideoCardTag} from "src/components/VideoCard/style";

class VideoCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false
        }
        this.videoControl = this.videoControl.bind(this);
    }

    videoControl() {
        const videoElem = this.refs.video
        videoElem.paused ? videoElem.play() : videoElem.pause()
    }

    init() {
        /**
         * 为保证缓冲等情况也能正确显示，这里均采用事件监听处理。
         */
        const videoElem = this.refs.video
        videoElem.onended = () => {
            this.setState({
                playing: false
            })
        }
        videoElem.onpause = () => {
            this.setState({
                playing: false
            })
        }
        videoElem.onplay = () => {
            this.setState({
                playing: true
            })
        }
    }

    componentDidMount() {
        this.init()

    }


    render() {
        return (
            <VideoCardTag id="videoCard">
                <video ref="video" src={this.props.videoObj.video}/>
                <VideoCardIconTag
                    width="135px"
                    height="135px"
                    type={IconTypeToPosition.videoPlay.type}
                    onClick={this.videoControl}
                    isPlaying={this.state.playing}
                />
            </VideoCardTag>
        )
    }
}


export default VideoCard


