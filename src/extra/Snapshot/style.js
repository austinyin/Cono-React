import styled from 'styled-components'


export const SnapshotTag = styled.div`
  min-height: 1000px;
  padding-top: 70px;  
  background: #262626;
  
  .user-wrapper .left-item{
    // usercard 文字设置白色
    color: #fff;
  }
  
  .media-con image,.media-con video{
    width: 100%;
  }
  
  .progress-bar-row > div{
    margin: 0 auto;
  }
  
  .progress-bar-con {
    height: 2px;
    border-radius: 2px;
    margin: 20px 0 40px;
  }

  .video-progress-bar-wrapper,.img-progress-bar-wrapper {
    display: flex;
    height: 100%;
    width: 100%;
    background: rgba(255,255,255,.35);

    
  }
  
  .img-progress-bar,.video-progress-bar-active {
    display: inline-block;
    height: 100%;
    
  }
  
  .img-progress-bar{
    background: rgba(255,255,255,.35);
  }
  
  .img-progress-bar-active,.video-progress-bar-active{
    background: #ffffff;
  }
`