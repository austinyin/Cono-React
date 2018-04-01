import styled,{css} from 'styled-components'
import {BorderStyles, ColorStyles} from "src/shared/styleJs/common/constantsStyle";


export const LogInOutTag = styled.div`
  .log-main{
    margin-bottom: 10px;
  }
  .logo-wrapper{
    margin-bottom: 20px;
  }
  
  h2{
    margin-bottom:10px;
    color: #999;
    font-size: 17px;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
  }
  input{
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    padding: 8px;
    border: ${BorderStyles.grayBorder};
    margin-bottom: 6px;
    outline: none;
    background: #FAFAFA;
    text-overflow: ellipsis;
  }
  button{
    width: 100%;
    padding: 8px 0;
    margin: 15px 0;
    background: ${ColorStyles.primary};
    border: ${ColorStyles.primary};
    border-radius: 3px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;    
    text-align: center;
    &:active {
      opacity: .7;
    }
  }
`

export const CommonFormWrapperTag = styled.div`
  width: 100%;
  padding: 40px;
  border: ${BorderStyles.commonBorder};
  background: #fff;
`

