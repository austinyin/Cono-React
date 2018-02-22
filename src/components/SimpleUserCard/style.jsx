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
        width: 30px;
        height: 30px;
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
    /* End left */
    
    
`

