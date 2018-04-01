import styled, {css} from "styled-components";
import {BorderStyles} from "src/shared/styleJs/common/constantsStyle";

export const fixedTop = css `
    position: fixed;
    top:0;
`


export const ComonCard = css`
    background: #fff;
    border-radius: 3px;
    border: 1px solid #e6e6e6;
`;

export const CommonFlex = css `
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const InlineToFill = css `
    display: inline-block;
    width: 100%;
    height: 100%;
`

export const AbsoluteFill = css`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    
`

export const AbsoluteCenter = css`
  position:absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
`

export const CommonBorder = css`
    border: ${BorderStyles.commonBorder};
    border-radius: 3px;
`
