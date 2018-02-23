import styled, {css} from 'styled-components'
import signIcon from "src/assets/img/common/icon/signIcon.png"
import textIcon from "src/assets/img/common/icon/textIcon.png"

export const SignIcon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  cursor: pointer;
  background: url(${props => props.active ?textIcon:signIcon });
  background-repeat: no-repeat;  
`


