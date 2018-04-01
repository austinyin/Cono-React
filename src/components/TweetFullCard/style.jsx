import styled, {css} from 'styled-components'
import {ComonCard} from "src/shared/styleJs/common/commonStyle";
import {TweetFullCardType} from "src/components/TweetFullCard/model";

export const TweetFullCardTag = styled.section`
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  margin-bottom: 60px;
  background: #ffffff;
  
  .media-con img, .media-con video{
      width: 100%;
    }
  .full-card-header{
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 16px;
    border-bottom: 1px solid #efefef;
    &>div{
      width: 100%;
      height: 100%;
    }
  }
  ${props => props.type === TweetFullCardType.dialog && TweetFullCardDialogExtend}
`



const TweetFullCardDialogExtend = css`
  max-width: 935px;
  height: 600px;
  display: flex;
  flex-direction: row;
  .tweet-full-card-main{
    min-width: 300px;
    padding: 0 24px;
  }

  .media-con-dialog{
      height: 100%;
      background: #000;
      & .img-con{
        height: 100%;
      }
      
      & img,video{
        width: 100%;
        min-width: 600px;
      }
  }
  
  #videoCard,.img-con{
    display: flex;
    align-items: center;
    background: #000;
  }
  

`

