import styled from 'styled-components'
import {BorderStyles} from "src/shared/styleJs/constantsStyle";

import camera from 'src/shared/assets/img/icon/camera.png'
import dv from 'src/shared/assets/img/icon/dv.png'

export const PubCardTag = styled.div`
  width:100%;
  border: ${BorderStyles.commonBorder};
  border-radius: 3px;
  background: #ffffff;

  .header, .footer{
    padding: 10px 20px; 
  }
  .header{
   border-bottom: ${BorderStyles.commonBorder};
   font-size: 13px;
    font-weight: 700;
    color: #444;
  }
  .pub-selections{
    height: 200px;
  }
  .pub-main-image,.pub-main-video {
    box-sizing: border-box;
    display: inline-block;
    width: 50%;
    height: 100%;
    line-height: 100%;
    & > div{
      text-align: center;
      }
    }
    
    .pub-main-image{
      background: url(${camera}) no-repeat center center;
    }
    .pub-main-video{
      background: url(${dv}) no-repeat center center;
    }
   
    .pub-icon-image,.pub-icon-video{
    display: inline-block;
    }
    

  // 媒体展示li
    .pub-medias{
        max-height: 600px;
        overflow-y: auto;
        overflow-x: hidden;
        margin-left: -1px;
        margin-right: -1px;
    }
    .pub-elem{
      display: block;
      position: relative;
      &> img{
      width: 100%;
      }
    }
    .pub-elem video,.pub-elem image{
      width: 100%;
    }
    .image-delete-icon,.video-delete-icon {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%,-50%);
    }
    
    .add-image-input-wrapper{
        width: 100%;
        height: 40px;
        border-top: 2px dashed #cfcfcf;
        border-bottom: 2px dashed #cfcfcf;
        margin: 5px 0;
        color: #989898;
        background-color: #f2f2f2;
        text-align: center;
        &> span{
          line-height: 40px;
        }
        
        &> .add-image-input{
          display: none;
        }
    }
    
    .pub-describe{
        position: relative;
        border-bottom: ${BorderStyles.commonBorder};
        & .textArea{
            width: 100%;
            height: 80px;
            padding: 20px;
            border: none;
            resize: none;
        }
        
        & .sign-icon{
          position: absolute;
          right: 20px;
          bottom: 10px;
        }
    }
    
   
    // 隐藏的表单
    .pub-form{
    display: none;
    }
    
    
    
    .footer-left-button-con,.footer-right-button-con{
        display: inline-block;
        cursor: pointer;
    }
    
    /* footer*/
    .footer-right-button-con{
      float: right;
    }
    
    .footer-left-button-con button,.footer-right-button-con button{
        font-size: 13px;
        font-weight: 700;
        border-radius: 2px 0 0 2px;
        padding: 5px 10px;
        border: none;
        color: #ffffff;
    }
    .footer-left-button-con button{
        background-color: #929ca6;
    }
    .footer-right-button-con button{
        background-color: #4295c7;
    }
    /* End footer*/
    
    /* multiSelect */
    #multiSelect input{
      padding:20px;
    }
    /* end multiSelect */
`


