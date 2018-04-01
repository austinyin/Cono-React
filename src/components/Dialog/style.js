import styled,{css} from 'styled-components'
import {AbsoluteCenter, AbsoluteFill} from "src/shared/styleJs/common/commonStyle";
import {TweetFullCardType} from "src/components/TweetFullCard/model";
import {Col_10, Col_12, Col_8} from "src/shared/styleJs/common/bootstrapStyle";

export const DialogTag = styled.div`
  position: fixed;
  z-index: 3;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  overflow: hidden;
  overflow-scrolling: unset;

  .dialog-bac{
    z-index: 3;
    ${AbsoluteFill};
    background-color: rgba(0,0,0,.5);
  }
  
  .dialog-tweet-con{
     z-index: 4;
    ${AbsoluteFill};

  }
`




export const DialogTweetWrapperTag = styled.div`
    z-index: 4;
    height: 600px;
    background: #ffffff;
    
    ${props => props.type === TweetFullCardType.dialog && AbsoluteCenter};
    ${props => props.type === TweetFullCardType.common && DialogTweetExtendStyle};
    
`

export const DialogTweetExtendStyle = css`
margin: 100px 0;
@media (min-width: 768px) {
  ${Col_8}
}
@media (min-width: 576px) and (max-width: 768px) {
  ${Col_10}
}

@media (max-width: 576px) {
  ${Col_12}
}
`

export const DialogButtonStyle = css`
    background: #fff;
    border: none;
    color: #262626;
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    line-height: 50px;
    margin: 0;
    overflow: hidden;
    padding: 0 16px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    border-bottom: 1px solid #dbdbdb;
    &:hover{
      background: #efefef;
    }
`

export const DialogButtonsTag = styled.div`
  button{
    ${DialogButtonStyle};
  }
`



