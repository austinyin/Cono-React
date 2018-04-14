import styled from 'styled-components'
import {AbsoluteFill, InlineToFill} from "src/shared/styleJs/commonStyle";
import {PositionIconTag} from "src/shared/styleJs/componentStyle";

export const TweetCardTag = styled.section`
  position: relative;

  
  .tweet-card-wrapper{
    ${InlineToFill}
  }
  
  .img-con{
    height: 100%;
  }
  
  .img-con img{
  width: 100%;
  height: 100%;
  }
  
  .tweet-image{
    width: 100%;
    height: 100%;
  }
  
  
  
  /* img cover hover显示的内容*/
  .img-cover{
    ${AbsoluteFill};
  display: none;
    align-items: center;
    background: rgba(0,0,0,.3);
  }
  
  &:hover .img-cover{
    display: flex;
  }
  
  .img-cover-middle{
  display: flex;
  width: 100%;
  height: 24px;
  overflow: hidden;
  justify-content: space-around;
  }
  
  .cover-middle-left,.cover-middle-right{
  display: inline-block;
  }
  
  .tag-label{
  color: #ffffff;
  margin-left: 5px;
  font-size: 16px;
  font-weight: 600;
  }
  
  /* End img cover*/

  

`

export const TweetTypeIcon = PositionIconTag.extend`
    position: absolute;
    right: 0;
    top: 0;
`

