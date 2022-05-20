import styled from 'styled-components'

export const DivContainer = styled.div`
  width: 30%;
  display: flex;
  height: 100vh;
  background-color: ${props => props.bgColor};
  align-self: flex-start;
  justify-content: space-between;
  flex-direction: column;
`

export const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  @media (max-width: 767px) {
    position: absolute;
    width: 100%;
    height: 70vh;
    opacity: 1;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    display: none;
  }
`

export const ListItems = styled.li`
  color: ${props => props.color};
  padding: 10px 0;
  display: flex;
  align-items: center;
  padding: 10px 25px;
  transition: background-color 0.5s;
  transform-origin: center center;
  :hover {
    background-color: ${props => props.bgColor};
    color: black;
    .nav-icons {
      color: red;
    }
  }
`

export const SpanEl = styled.span`
  padding: 0 10px;
`
export const ContactDiv = styled.div`
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 767px) {
    display: none;
  }
`
export const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const LogoImg = styled.img`
  width: 34px;
  border-radius: 10px;
  margin: 4px;
`
export const ContactPara = styled.p`
  font-size: 22px;
`
export const Para = styled.p`
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  padding: 4px;
`

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 15px;
  color: '#94a3b8';
  :hover {
    color: red;
    background-color: ${props => props.bgColor};
  }
  @media (max-width: 576px) {
    padding-left: 5px;
    border: 1px solid ${props => props.color};
    border-radius: 15px;
  }
`

export const ItemPara = styled.p`
  color: ${props => props.color};
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: 500;
  margin-left: 10px;
  :hover {
    color: red;
    background-color: ${props => props.bgColor};
  }
  @media (max-width: 576px) {
    font-size: 8px;
  }
`
