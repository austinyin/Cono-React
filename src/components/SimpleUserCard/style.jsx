import styled from 'styled-components'
import {CommonFlex} from "src/shared/styleJs/common/commonStyle";

export const SimpleUserCardTag = styled.div`
    height: inherit;
    ${CommonFlex};
    /* left */
    .suc-left{
      ${CommonFlex};
    }
    .img{
        width: ${props => props.imgWidth || "30px"};
        height: ${props => props.imgHeight || "30px"};
        border-radius: 50%;
        background: #ffffff;
    }
    
    .infos-con{
      margin-left: 10%;
    }
    .left-item{
        display: block;
        line-height: 90%;
    }
    .left-subtitle{
        color: #999;
        font-size: 14px;
      }
    /* End left */
    
    
`

