import styled from 'styled-components'
import ChineseLayout from '../../components/ChineseLayout'

const StyledName = styled.h1`
  font-weight: normal;
`

const StyledContent = styled.p`

`

const StyledSVGs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;

  img {
    width: 100px;
    height: auto;
    cursor: pointer;
  };

  a {
    text-decoration: none;
  }

  p {
    color: black;
    margin: 0;
    text-align: center;
  }
`


const IndexPage = () => (
  <ChineseLayout title="Ryan Zheng">
    <StyledName>鄭聖玄</StyledName>
    <StyledContent>大學剛畢業的準工程師，喜歡的技術有: React.js, TypeScript, Node.js...</StyledContent>
    <br />
    <StyledSVGs>
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/ryanzheng1998"><img src="/logo-github.svg" alt="github logo"/><p>Github</p></a>
      <a target="_blank" rel="noopener noreferrer" href="https://codepen.io/ryanzheng"><img src="/logo-codepen.svg" alt="codepen logo"/><p>Codepen</p></a>
      <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/sheng-xuan-zheng/"><img src="/logo-linkedin.svg" alt="linkedin logo"/><p>Linkin</p></a>
      <a target="_blank" rel="noopener noreferrer" href="mailto:ryan.zheng.1998@gmail.com"><img src="/mail-outline.svg" alt="mail logo"/><p>Email</p></a>
    </StyledSVGs>
  </ChineseLayout>
)

export default IndexPage
