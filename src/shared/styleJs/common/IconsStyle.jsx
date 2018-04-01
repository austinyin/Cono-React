import styled from "styled-components";
import commonIcon from 'src/shared/assets/img/common/icons2.png'

export const IconTypeToPosition = {
    logo: {type: "logo", position: "-228px 0"},
    explore: {type:"explore", position:"-310px -352px"},
    notice: {type:"notice", position:"-408px 0"},
    selfCenter: {type:"selfCenter", position:"-362px -352px"},
    like: {type:"like", position:"-463px -26px",actPosition:"-365px -414px", filledPosition: "-384px -286px"},
    answer: {type:"answer", position:"-330px -372px", filledPosition: "-384px -265px"},
    collect: {type:"collect", position:"-261px -414px",actPosition:"-463px 0"},
    ellipsis: {type:"ellipsis", position:"-141px -441px"},
    leftDirection: {type:"leftDirection", position:"-178px -228px;"},
    rightDirection: {type:"rightDirection", position:"-274px -228px"},
    videoPlay: {type:"videoPlay", position:"0 0"},
    camera: {type:"camera", position:"-405px -224px"},
    multiImages: {type:"multiImages", position:"-405px -274px;"},
    setting: {type: "setting", position: "-338px -413px;"},
}

export const PositionIconTag = styled.span`
  display: ${props => props.hide? "none" : "inline-block" };
  width: ${props => props.width || "24px" };
  height: ${props => props.height || "24px" };
  cursor: ${props => props.notCursor || "pointer" };
  vertical-align: middle;
  background-image: url(${commonIcon});
  background-repeat: no-repeat;
  background-position: ${props => IconTypeToPosition[props.type].position};
  background-position: ${props => props.fill&&IconTypeToPosition[props.type].filledPosition};
  background-position: ${props => props.active&&IconTypeToPosition[props.type].actPosition};

`


export const ButtonIconTag = styled.span`
  display: ${props => props.hide? "none": "inline-block"};
  width: ${props => props.width };
  height: ${props => props.height};
  border: none;
  outline: none;
  background-image: url(${props => props.bacImage});
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`
