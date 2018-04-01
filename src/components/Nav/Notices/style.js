import styled,{css} from 'styled-components'
import {BorderStyles, BoxShadowStyles} from "src/shared/styleJs/common/constantsStyle";

export const NotecesTag = styled.div`
  width: 500px;
  max-height: 360px;
  
  @media screen and (max-width: 576px) {
      width: 350px;
  }
  
  overflow: auto;
  border: ${BorderStyles.grayBorder};
  box-shadow: ${BoxShadowStyles.commonShadow};
  background: #fff;
  
  ul>{
    height: 100%;
  }
  li{
    display: flex;
    justify-content: center;
    
    height: 65px;
    border-bottom: ${BorderStyles.grayBorder};
    padding: 12px 16px;
    & .row{
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
  }

  
  .notice-username{
    font-weight: 600;
  }
  
  .action-desc{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  
  .notice-card-right{
    text-align: right;
  }
  
  .avatar-con,.tweet-thumnail-con{
  display: inline-block;
    &>img{
      width: 100%;
      height: 100%;
      border-radius: 50%;

    }
  }
  .avatar-con{
  margin-right: 5px;
  }
  .avatar-con{
    width: 34px;
    height: 34px;
  }
  .tweet-thumnail-con{
    width: 40px;
    height: 40px;
    &>img{
      width: 100%;
      height: 100%;
    }
  }
`
