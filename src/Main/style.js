import styled from 'styled-components'
import {BorderStyles} from "src/shared/styleJs/constantsStyle";
import {fixedTop} from "src/shared/styleJs/commonStyle";

export const MainTag = styled.div`

// 顶部导航固定定位时占位
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