import styled from "styled-components"
import {infiniteRotateStyle} from "src/shared/styleJs/animationStyle";

export const LoadingTag = styled.span`
  display: inline-block;
  width: 100%;
  height: 100%;
  background: url(${props=> props.image}) no-repeat;
  background-size: 100% 100%;
  animation: ${infiniteRotateStyle} 1s infinite forwards;
`