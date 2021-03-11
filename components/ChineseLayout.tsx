import React from 'react'

import ChineseNav from './ChineseNav'
import Footer from './Footer'
import MetaData from './MetaData'
import styled from 'styled-components'

const StyledPageContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  width: 60%;

  @media(max-width: 767px){
    width: 90%;
  }
`

interface Props {
  children?: React.ReactNode;
  title: string;
}

const ChineseLayout = ({ children, title }: Props) => (
    <StyledPageContainer>
        <MetaData title={title} />
        <ChineseNav />
        {children}
        <Footer />
    </StyledPageContainer>
)


export default ChineseLayout
