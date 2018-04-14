import styled from "styled-components"
import {AbsoluteCenter} from "src/shared/styleJs/commonStyle";

export const AnimationsTag = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.3);
  z-index: 3;
  .loading-wrapper{
    display: inline-block;
    width: 150px;
    height: 150px;
    ${AbsoluteCenter};
  }
`