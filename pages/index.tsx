import styled from 'styled-components'
import Layout from '../components/Layout'

const StyledName = styled.h1`
`

const StyledEnglishName = styled.h1`
`

const StyledContent = styled.p`

`


const IndexPage = () => (
  <Layout title="Ryan Zheng">
    <StyledName>鄭聖玄</StyledName>
    <StyledEnglishName>Ryan Zheng</StyledEnglishName>
  </Layout>
)

export default IndexPage
