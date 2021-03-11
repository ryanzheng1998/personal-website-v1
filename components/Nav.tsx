import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const StyledHeader = styled.header`
    width: 100%;
`

const StyledNav = styled.nav`
    display: grid;
    grid-template-columns: 1fr 80px 80px 80px;
    grid-template-areas: 'logo  link1  link2  link3';
    padding: 30px 100px;
    align-items: center;
    justify-items: center;

    a {
        text-decoration: none;
    }
`

const StyledLogo = styled.h1`
    grid-area: logo;
    justify-self: start;
    margin: 0;
`

const Nav: React.FC = () => (
    <StyledHeader>
        <StyledNav>
            <StyledLogo>Ryan Zheng</StyledLogo>
                <Link href='/'>Home</Link>
                <Link href='projects'>Projects</Link>
                <Link href='/about'>About</Link>
        </StyledNav>
    </StyledHeader>
)

export default Nav