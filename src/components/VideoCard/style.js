import styled from 'styled-components'
import {PositionIconTag} from "src/shared/styleJs/componentStyle";
import {AbsoluteCenter} from "src/shared/styleJs/commonStyle";
import videoPlayIcon from 'src/shared/assets/img/icon/videoPlay.png'

export const VideoCardTag = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const VideoCardIconTag = PositionIconTag.extend`
    opacity: ${props => props.isPlaying? "0" : "1"};
    background: url(${videoPlayIcon}) no-repeat;
    transition: opacity .6s ease;
    ${AbsoluteCenter};
`