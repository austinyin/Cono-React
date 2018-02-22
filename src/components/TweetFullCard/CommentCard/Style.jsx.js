import styled from 'styled-components'

export const CommentCardTag = styled.div`
   .c-header-top{
    display: flex;
    justify-content: space-between;
  }
  
  // relation状态
  .like_active,.collect_active{
    color: red;

  }
  
  /* comment-items */
  .comment-items .item{
    position: relative;
      display: flex;
  }
  
  .content-maker{
        position: absolute;
        left: 0;
        top: 0;
  }
  .item-content{
    display: inline-block;
    text-indent: 60px;
    vertical-align: middle;
    align-items: center;
    max-width: 100%;
  }
  
  .item-content p{
      display: inline-block;
  }
  /* End comment-items */
  
  /* comment-input-con */
  .comment-input-con{
    padding-right: 26px;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    }
    
    .comment-input-con textarea{
      border: none;
    }
    
    .comment-input-button-con button{
        background: none;
        border: none;
    }
  /* End comment-input-con */

  /* dialog-comment-card */
    // 弹窗下的布局
    .dialog-comment-card{
      display: flex;
      flex-direction: column;
    }
    .comment-items{
    order: 1;
    height: 380px;
    }
    .c-header{
    order: 2;
    }
    .comment-input-con{
    order: 3;
    }
  /* End dialog-comment-card */

`

