import styled from "styled-components";
import commonIcon from 'src/shared/assets/img/common/icons2.png'
import {BorderStyles, ColorStyles} from "src/shared/styleJs/constantsStyle";

export const ComonCardTag = styled.section`
  background: #fff;
  border-radius: 3px;
  border: 1px solid #e6e6e6;
`


export const CommonInputTag = styled.input`
width: ${props => props.width};
width: ${props => props.height};
  padding: 3px 15px;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  outline: none;
  color: #262626;
  background-color: rgb(250,250,250);
  font-size: 14px;
`

export const IconTypeToPosition = {
    logo: {type: "logo", position: "-228px 0"},
    explore: {type: "explore", position: "-310px -352px"},
    notice: {type: "notice", position: "-408px 0"},
    selfCenter: {type: "selfCenter", position: "-362px -352px"},
    like: {type: "like", position: "-463px -26px", actPosition: "-365px -414px", filledPosition: "-384px -286px"},
    answer: {type: "answer", position: "-330px -372px", filledPosition: "-384px -265px"},
    collect: {type: "collect", position: "-261px -414px", actPosition: "-463px 0"},
    ellipsis: {type: "ellipsis", position: "-141px -441px"},
    leftDirection: {type: "leftDirection", position: "-178px -228px;"},
    rightDirection: {type: "rightDirection", position: "-274px -228px"},
    videoPlay: {type: "videoPlay", position: "0 0"},
    camera: {type: "camera", position: "-405px -224px"},
    multiImages: {type: "multiImages", position: "-405px -274px;"},
    setting: {type: "setting", position: "-417px -421px;"},
}

export const PositionIconTag = styled.span`
  display: ${props => props.hide ? "none" : "inline-block" };
  width: ${props => props.width || "24px" };
  height: ${props => props.height || "24px" };
  cursor: ${props => props.notCursor || "pointer" };
  vertical-align: middle;
  background-image: url(${commonIcon});
  background-repeat: no-repeat;
  background-position: ${props => IconTypeToPosition[props.type].position};
  background-position: ${props => props.fill && IconTypeToPosition[props.type].filledPosition};
  background-position: ${props => props.active && IconTypeToPosition[props.type].actPosition};
`


export const CommonButtonTag = styled.button`
  width: ${props => props.block ? "100%" : props.width};
  height: ${props => props.height || "28px"};
  padding: 0 24px;
  color: ${props => props.active ? "#000" : "#fff"};
  border: ${props => props.active ? "1px solid #000" : "1px solid #dbdbdb"};
  border-radius: 3px;
  background: ${props => props.active ? "#fff" : "#3897f0"};
  font-size: 14px;
  font-weight: 600;
  line-height: 26px;
  cursor: pointer;
`

export const FormButtonTag = styled.button`
    color: ${props => props.fontColo ? props.fontColor : "#fff"};
    padding: 8px 0;
    background: ${props => props.bacColor && ColorStyles[props.bacColor]};
    border: ${props => props.bacColor && ColorStyles[props.bacColor]};
    text-align: center;
    &:active {
      opacity: .7;
    }
`

export const FormInputTag = styled.input`
    box-sizing: border-box;
    width: ${props => props.block ? "100%" : props.width};
    height: ${props => props.height || "40px"};
    padding: 8px;
    border: ${BorderStyles.commonBorder};
    margin-bottom: 6px;
    background: #fff;
    outline: none;
    text-overflow: ellipsis;
`

export const CommonWrapperTag = styled.div`
  max-width: 935px;
  margin: 0 auto;
`


export const TweetItemsWrapperTag = styled.div`
    .row{
    margin-left: 0;
    margin-right: 0;
    }
    margin-left: ${props => props.tweetMargin||"-15px"};
    margin-right: ${props => props.tweetMargin||"-15px"};
    @media (max-width: 768px) {
        margin-left: ${props => props.tweetMdMargin||"-1.5px"};
        margin-right: ${props => props.tweetMdMargin||"-1.5px"};  
    }
`

export const TweetCardConTag = styled.div`
  max-width: 293px;
  max-height: 293px;
  margin: ${props => props.tweetMargin||"15px"};
  @media (max-width: 768px) {
    margin: ${props => props.tweetMdMargin||"1.5px"};  
  }
`