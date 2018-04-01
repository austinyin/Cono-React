import styled from 'styled-components'

import logo from 'src/shared/assets/img/common/icons.png'
import icons from 'src/shared/assets/img/common/icons.png'
import pubIcon from 'src/shared/assets/img/common/letpub.png'
import {BorderStyles} from "src/shared/styleJs/common/constantsStyle";

export const NavTag = styled.div`
    display: flex;
    max-width: 1010px;
    height:  ${props => props.isTop ? "77px" : "52px"};
    margin: 0 auto;
    align-items: center;
    transition: height 0.5s ease;
    background: #fff;
    
    .nav-main {
    margin: 0 auto;
    padding: 0 40px;

    }

    /* 左中右 */
    .nav-left, .nav-center, .nav-right {
        display: flex;
        align-items: center;
    }
    .nav-left{
        justify-content: left;
    }
    .nav-center{
      justify-content: center;
    }
    
    .nav-right{
      justify-content: right;
    }
   
    
    

    .nl-infos-con {
        display: ${props => props.isTop ? "inline-block" : "none"};
        background-image: url(${logo});
        background-repeat: no-repeat;
        background-position: -177px 0;
        height: 36px;
        width: 176px;
        transition: all 0.5s ease;
    }
    
    .nl-infos-con-moving{
        display: ${props => props.isTop ? "none" : "inline-block"};
        height: 36px;
        width:  36px;
    }


    .notices-icon{
      position: relative;

    }
    .notices-con{
        position: fixed;
        top: 90px;
        right: 20px;
   
        }
    }
    .notice-hide{
        display: none;
    }

    /* 中间部分 */
    .nav-center{
        position: relative;
        justify-content: center;
    }
    
    /* END 中间部分 */



    /* 右侧部分 */
    .nav-right{
      justify-content: flex-end;
    }

    .nr-icon{
      display: inline-block;
      background-image: url(${icons});
      background-repeat: no-repeat;
      width: 24px;
      height: 24px;
      margin-left: 30px;
      vertical-align: middle;
      &.explore-icon{
        background-position: -310px -352px;
      }
      &.recent-icon{
        background-position: -408px 0;
      }
      &.recent-icon-active{
        background-position: -408px -52px;;
      }
      &.self-center-icon{
        background-position: -362px -352px;
      }
      &.pub-icon{
        width: 35px;
        height: 35px;
        background-image: url(${pubIcon});
      }
}
    /* END 右侧部分 */
    
    /* 响应式部分 */
    @media screen and (max-width: 576px) {
    .nav-main{
        padding: 15px;
    }
    
    .nr-icon {
        margin-left: 10px;
    }
    /* END 响应式部分 */


`


export const SearchResultTag = styled.ul`
  display: ${props=> props.hide&&'none'};
  position: absolute;
  top: 100%; 
  z-index: 4;
  width: 240px;
  height: 360px;
  overflow: auto;
  li{
    height: 67px;
    padding: 8px 14px;
    background: #fff;
    &:hover{
      background: #fafafa;
    }
    border: ${BorderStyles.grayBorder};
  }
`

