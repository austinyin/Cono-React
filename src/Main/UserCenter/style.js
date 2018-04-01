import styled from 'styled-components'
import {BorderStyles} from "src/shared/styleJs/common/constantsStyle";
import {CenterChooseType} from "src/Main/UserCenter/model";

export const UserCenterHeaderTag = styled.header`
  margin: 60px 0 45px;
  
  .bolder-font{
      font-weight: 600;
  }
  
  .avatar-wrapper{
  text-align: center;
  &>img{
    width: 152px;
    height: 152px;
    border-radius: 50%;
  } 
  }
  
  .right-top,.right-middle{
  margin-bottom: 20px;
  }
  .right-top > * {
    margin-right:20px;
    vertical-align: middle;
  }
  .setting-icon{
      margin-left: 5px;
  }
  
  h1{
    display: inline-block;
    margin: 0;
    font-size: 32px;
    line-height: 40px;
    font-weight: 200;
  }
  
  .self-center-link{ 
    padding: 3px 24px;
    vertical-align: middle;
    background: 0 0;
    color: #262626;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 600;
    line-height: 26px;
  }
  
  
  .right-middle > span{
      margin-right: 40px;
    
  }
  .right-middle span{
    font-size: 16px;
    color: #262626;
  }
  
  .right-bottom p,.right-bottom a{
    font-size: 16px;
    line-height: 24px;
  }
  .right-bottom p{
    width: 100%;
    color: #262626;
    word-wrap: break-word;
  }
  
  .right-bottom a{
    color: #003569;
    font-weight: 600;
    &:hover{
      text-decoration: none;
    }
  }

  
  
  
  
`




export const ChooseTag = styled.div`
  border-top: ${BorderStyles.grayBorder};
  .choose-main{
    display: flex;
    width: 130px;
    height: 50px;
    margin: 0 auto;
    justify-content: space-between;
  }
  .choose-item{
    display: inline-block;
    width: 100%;
    height: 100%;
    margin: 0 10px;
    color: #999;
    font-size: 12px;
    font-weight: 600;
    line-height: 50px;
    text-align: center;
    cursor:pointer;
  }
  

  .choose-item-pub{
      ${props => props.activeType === CenterChooseType.publish&&`
        color:#000;
        border-top: 1px solid #000;
      `}
    
  }
  .choose-item-collect{
    ${props => props.activeType === CenterChooseType.collect&&`
        color:#000;
        border-top: 1px solid #000;
      `}
  }
`