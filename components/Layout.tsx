import React, { ReactNode } from 'react'

import Nav from './Nav'
import Footer from './Footer'
import MetaData from './MetaData'
import styled from 'styled-components'

const StyledPageContainer = styled.div`

`


interface Props {
  children?: ReactNode;
  title: string;
}

const Layout = ({ children, title }: Props) => (
  <StyledPageContainer>
    <MetaData title={title} />
    <Nav />
    {children}
    <Footer />
  </StyledPageContainer>
)

export default Layout
