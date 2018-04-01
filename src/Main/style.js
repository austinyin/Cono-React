import styled from 'styled-components'
import {BorderStyles} from "src/shared/styleJs/common/constantsStyle";
import {fixedTop} from "src/shared/styleJs/common/commonStyle";

export const MainTag = styled.div`

// 导航固定定位了，所以需要一个占位
.nav-holder{
  height: 77px;
  
}

.nav-con{
    ${fixedTop};
    z-index: 2;
    background: #fff;
    border-bottom: ${BorderStyles.commonBorder};
    width: 100%;
    }
`