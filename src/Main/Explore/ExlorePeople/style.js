import styled from 'styled-components'
import {BorderStyles} from "../../../shared/styleJs/common/constantsStyle";

export const ExplorePeopleWrapperTag = styled.div`
  max-width: 600px;
  margin: 60px auto;
`

export const UserCardWrapper = styled.li`
  width: 100%;
  height: 73px;
  padding: 8px 16px;
  border: ${props => BorderStyles.commonBorder};
  margin-top: -1px;
  &>div {
    height: 100%;
  }
`

export const ExplorePeopleTag = styled.div`
  
`