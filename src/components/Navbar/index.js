import {HiHome} from 'react-icons/hi'
import {AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import {Link} from 'react-router-dom'
import {Component} from 'react'

import {
  DivContainer,
  ListItem,
  ItemPara,
  ContactDiv,
  LogosContainer,
  LogoImg,
  ContactPara,
  Para,
} from './styledComponents'

import './index.css'
import AppTheme from '../../context/Theme'

class Navbar extends Component {
  render() {
    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value
          const color = activeTheme === 'light' ? '#000000' : '#ffffff'
          const hoverBgColor = activeTheme === 'light' ? '#616e7c' : '#475569'
          const bgColor = activeTheme === 'light' ? '#f9f9f9' : '#231f20'
          return (
            <DivContainer color={`${color}`} bgColor={`${bgColor}`}>
              <div className="Nav_list">
                <ListItem color={`${color}`} bgColor={`${hoverBgColor}`}>
                  <HiHome />
                  <ItemPara color={`${color}`}>
                    <Link to="/">Home</Link>
                  </ItemPara>
                </ListItem>
                <ListItem>
                  <AiFillFire />
                  <ItemPara>
                    <Link to="/trending">Trending</Link>
                  </ItemPara>
                </ListItem>
                <ListItem>
                  <SiYoutubegaming />
                  <ItemPara>
                    <Link to="/gaming">Gaming</Link>
                  </ItemPara>
                </ListItem>
                <ListItem>
                  <MdPlaylistAdd />
                  <ItemPara>
                    <Link to="/saved-videos">Saved videos</Link>
                  </ItemPara>
                </ListItem>
              </div>
              <ContactDiv color={`${color}`} bgColor={`${bgColor}`}>
                <ContactPara>CONTACT US</ContactPara>
                <LogosContainer>
                  <LogoImg
                    alt="facebook logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  />
                  <LogoImg
                    alt="twitter logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  />
                  <LogoImg
                    alt="linked in logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  />
                </LogosContainer>
                <Para>
                  Enjoy! Now to see your channels and recommendations!
                </Para>
              </ContactDiv>
            </DivContainer>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}
export default Navbar
