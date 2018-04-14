import styled, {css} from 'styled-components'
import signIcon from "src/shared/assets/img/icon/signIcon.png"
import textIcon from "src/shared/assets/img/icon/textIcon.png"
import {TweetFullCardType} from "src/components/TweetFullCard/model";

export const SignIcon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  cursor: pointer;
  background: url(${props => props.active ?textIcon:signIcon }) no-repeat;
`
export const CommentCardTag = styled.div`
padding: 0 16px;
  .c-header-top{
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
  }
  
  .comment-items .item{
      padding: 5px 0 6px 0;
      position: relative;
      display: flex;
  }
  .content-maker{
        position: absolute;
        left: 0;
        top: 5px;
  }
  
  .item-content{
        display: inline-block;
        max-width: 100%;
        align-items: center;
        vertical-align: middle;
      }
      
  .item-content p{
      display: inline-block;
      max-width: 100%;
      text-indent: 60px;
      overflow-wrap: break-word;
      margin: 0;
  }
  
  .delete-comment-button{
        vertical-align: top;
  }
  
  .show-more-content a{
      color: #999;
    }
    
  
  /* 发表时间 */
  .pub-time{
    padding-bottom: 6px;
    border-bottom: 1px solid #efefef;
  }
  .pub-time a{
    color: #999;
    font-size: 12px;
  }
  /* End 发表时间 */

  .comment-form{
    display: flex;
    height: 100%;
    padding: 16px 26px  16px 0;
    align-items: center;
    justify-content: space-between;
    }
    
    .input-con{
      min-width: 80%;
    }

    .input-con input{
      width: 100%;
      border: none;
    }
    .comment-input-button-con button{
        background: none;
        border: none;
    }
    
  .sign-icon{
    cursor: pointer;
  }
  ${props => props.type === TweetFullCardType.dialog && DialogCommentCardTagExtend};
`

export const DialogCommentCardTagExtend = css`
  display: flex;
  flex-direction: column;
  .comment-items{
    order: 1;
    height: 380px;
    flex:  0 0 65%;
  }
  .pub-time{
    order: 2;
    flex: 0 0 5%;
  }
  .c-header{
    order: 3;
    flex: 0 0 15%;
  }
  .comment-form{
    order: 4;
    flex:  0 0 15%;
  }
`