import styled,{css} from 'styled-components'
import {BorderStyles} from "src/shared/styleJs/constantsStyle";
import {CommonBorder} from "src/shared/styleJs/commonStyle";


const AsideStyle = css`
  text-align: right;
  padding-right: 20px;
  span{
    font-size: 16px;
    font-weight: 600;
    color: #262626;
  }
`

export const SettingCenterTag = styled.div`
  .row{
  margin-left: 0;
  margin-right: 0;
  }
  border: ${BorderStyles.grayBorder};
  border-radius: 3px;
  margin: 60px 0;
  background: #fff;
  
  .menu,.menu ul{
    height: 100%;
  }
  .menu{
    border-right: ${BorderStyles.grayBorder};
  }
`

export const SettingLeftElemTag = styled.li`
  height: 52px;
  a{
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 16px 16px 16px 30px;
    margin-left: 1px;
    color: #262626;
    font-size: 16px;
    font-weight: normal;
    ${props=>props.active&&`
        border-left: 2px solid #000;
        font-weight:600;
    `}
    &:hover{
      color: #262626;
      text-decoration: none;
    }
  }
`

export const SettingRightWrapperTag = styled.div`
  max-width: 460px;
  margin: 30px 0;

`

export const SettingRightRowTag = styled.div`
  height: 32px; 
  margin-bottom: 15px;
  aside{
      ${AsideStyle};
  }
 
  .row-right input{
    width: 100%;
    height: 100%;
    ${CommonBorder};
  }

`


export const SettingRightFirstRowTag = styled.div`
  height: 52px; 
  margin-bottom: 30px;
  aside{
      ${AsideStyle};
      align-items: center;
  }
  
  h2{
  font-size: 20px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 4px;
  }
  
`

export const AvatarSetFormTag = styled.form`
  input{
  display: none;
  }
  .avatar-set-button{
    font-weight: 600;
    color: #3897f0 !important;
  }
`


export const AvatarTag = styled.img`
  width: ${props => props.width||"36px"};
  height: ${props => props.height||"36px"};
  border-radius: 50%;
`

export const SelectTag = styled.select`
    width: 140px;
    height: 100%;
    padding: 0 30px 0 10px;
    ${CommonBorder};
    color: #262626;
    font-size: 16px;
`

