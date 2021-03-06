import React, { ReactNode, useState } from 'react'

import Nav from './Nav'
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
  children?: ReactNode;
  title: string;
}

const Layout = ({ children, title }: Props) => {
  
  return (
    <StyledPageContainer>
      <MetaData title={title} />
      <Nav/>
      {children}
      <Footer />
    </StyledPageContainer>
  )
}

export default Layout
