import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const StyledHeader = styled.header`
    width: 100%;
`

const StyledNav = styled.nav`
    display: grid;
    grid-template-columns: 1fr 80px 80px 80px;
    grid-template-areas: 'logo  link1  link2 language';
    padding: 30px 0;
    align-items: center;
    justify-items: center;

    a {
        text-decoration: none;
        color: black;
    }

    @media(max-width: 767px){
        grid-template-columns: 1fr 50px 50px 50px;
        grid-template-areas: 'logo  link1  link2  language';
    }
`

const StyledLogo = styled.h1`
    grid-area: logo;
    justify-self: start;
    margin: 0;
`

const LanguageDiv = styled.div`
    img {
        width: 25px;
        height: auto;
        cursor: pointer;
    }
`


const Nav: React.FC = () => (
    <StyledHeader>
        <StyledNav>
            <StyledLogo>Ryan Zheng</StyledLogo>
            <Link href='/'>Home</Link>
            <Link href='/projects'>Projects</Link>
            <Link href='/chinese'><LanguageDiv><img src='/language-outline.svg' alt='選擇語言'/></LanguageDiv></Link>
        </StyledNav>
    </StyledHeader>
)

export default Nav