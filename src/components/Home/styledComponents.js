import styled from 'styled-components'

export const HomeContainer = styled.div`
  flex-wrap: wrap;
  height: 100vh;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  @media (max-width: 767px) {
    margin-top: 10px;
  }
`

export const HeadDiv = styled.div`
    border: 1px solid grey;
    width: fit-content;
    margin:20px;
    margin-top:20px;
    border-radius: 4px;
    display: flex;
 background-color: ${props => props.bgColor};
  color: ${props => props.color};
    align-items: center;
}`

export const SearchIp = styled.input`
    width: 300px;
     color: ${props => props.color};
     background-color: ${props => props.bgColor};
    outline: none;
    padding: 5px;
    border: grey;
    @media (max-width:767px){
        width: 100%;
    }
}`

export const ButtonEl = styled.button`
  border: none;
  outline: none;
  padding: 10px;
  cursor: pointer;
  @media (max-width: 767px) {
    padding: 3px;
  }
`

export const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 25px;
  @media (min-width: 768px) {
    width: 240px;
    height: 270px;
  }
`

export const ListItem = styled.li`
  margin-right: 10px;
  display: flex;
  cursor: pointer;
`

export const ImageTag = styled.img`
  width: ${props => props.width};
  object-fit: contain;
`
export const ContentDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
`

export const ParaTag = styled.p`
  font-size: ${props => props.fontSize};
`

export const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  @media (max-width: 767px) {
    justify-content: center;
  }
`

export const NoVideosImage = styled.img`
  width: 30%;
  object-fit: contain;
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    padding-top: 30px;
  }
`
export const NoResultsHeading = styled.h1`
  @media (max-width: 767px) {
    font-size: large;
  }
`

export const NoResultsPara = styled.p`
  @media (max-width: 767px) {
    font-size: medium;
  }
`

export const NoResultsButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
`

export const BannerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  height: 30vh;
  justify-content: space-between;
  @media (min-width: 767px) {
    background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
    background-size: 100vw;
  }
`

export const ImageEl = styled.img`
  cursor: ${props => props.cursor};
  @media (max-width: 767px) {
    height: ${props => props.height};
    display: ${props => props.display};
  }
  @media (min-width: 768px) {
    height: 30px;
    margin: 0px ${props => props.margin};
  }
`

export const BannerContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
`
