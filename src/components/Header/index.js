import {Component} from 'react'
import {HiHome} from 'react-icons/hi'
import {AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import {ImCross} from 'react-icons/im'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

import AppTheme from '../../context/Theme'

import {
  HeaderContainer,
  HeaderContentsSmallContainer,
  HeaderContentsLargeContainer,
  ImageEl,
  ButtonElSmall,
  ButtonElLarge,
  ListContainer,
  ListItem,
  Para,
  PopUpView,
  ConfirmButton,
  ButtonsDiv,
  ModalPara,
  ExtraDiv,
} from './styledComponents'

class Header extends Component {
  state = {
    displayHeader: 'none',
  }

  showHeader = () => {
    this.setState({displayHeader: 'block'})
  }

  hideHeader = () => {
    this.setState({displayHeader: 'none'})
  }

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickLogo = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {displayHeader} = this.state
    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme, changeTheme} = value
          const color = activeTheme === 'light' ? '#000000' : '#ffffff'
          const bgColor = activeTheme === 'light' ? '#ffffff' : '#231f20'
          const navColor = activeTheme === 'light' ? 'blacked' : 'whiter'
          const onChangeTheme = () => {
            const val = activeTheme === 'light' ? 'dark' : 'light'
            changeTheme(val)
          }

          return (
            <HeaderContainer bgColor={`${bgColor}`}>
              <Link to="/">
                <ImageEl
                  height="25px"
                  src={
                    activeTheme === 'light'
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  }
                  alt="website logo"
                  onClick={this.onClickLogo}
                  cursor="pointer"
                />
              </Link>

              <HeaderContentsSmallContainer>
                <ButtonElSmall onClick={onChangeTheme} color={`${color}`}>
                  {activeTheme === 'light' ? (
                    <BsMoon size={25} />
                  ) : (
                    <BsBrightnessHigh size={25} />
                  )}
                </ButtonElSmall>
                <ButtonElSmall onClick={this.showHeader} color={`${color}`}>
                  <GiHamburgerMenu size={25} />
                </ButtonElSmall>
                <ButtonElSmall onClick={this.logout} color={`${color}`}>
                  <FiLogOut size={25} />
                </ButtonElSmall>
              </HeaderContentsSmallContainer>
              <ExtraDiv display={displayHeader}>
                <ListContainer
                  bgColor={activeTheme === 'light' ? '#e2e8f0' : '#000000'}
                >
                  <Para onClick={this.hideHeader}>
                    <ImCross
                      color={activeTheme === 'light' ? '#000' : ' #d7dfe9'}
                    />
                  </Para>

                  <ListItem color={`${color}`}>
                    <HiHome className="nav-icons" />{' '}
                    <Link to="/" className={navColor}>
                      Home
                    </Link>
                  </ListItem>

                  <ListItem color={`${color}`}>
                    <AiFillFire className="nav-icons" />{' '}
                    <Link to="/trending" className={navColor}>
                      Trending
                    </Link>
                  </ListItem>

                  <ListItem color={`${color}`}>
                    <SiYoutubegaming className="nav-icons" />{' '}
                    <Link to="/gaming" className={navColor}>
                      Gaming
                    </Link>
                  </ListItem>

                  <ListItem color={`${color}`}>
                    <MdPlaylistAdd className="nav-icons" />
                    <Link to="/saved-videos" className={navColor}>
                      Saved Videos
                    </Link>
                  </ListItem>
                </ListContainer>
              </ExtraDiv>

              <HeaderContentsLargeContainer>
                <ButtonElLarge
                  border="none"
                  data-testid="theme"
                  onClick={onChangeTheme}
                  color={color}
                >
                  {activeTheme === 'light' ? (
                    <BsMoon size={25} />
                  ) : (
                    <BsBrightnessHigh size={25} className="animate" />
                  )}
                </ButtonElLarge>
                <ImageEl
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  margin="30px"
                />

                <Popup
                  modal
                  trigger={
                    <ButtonElLarge
                      type="button"
                      padding="5px 15px"
                      color={activeTheme === 'light' ? '#3b82f6' : '#ffffff'}
                    >
                      Logout
                    </ButtonElLarge>
                  }
                >
                  {close => (
                    <PopUpView color={`${color}`} bgColor={`${bgColor}`}>
                      <ButtonsDiv>
                        <ModalPara color={`${color}`}>
                          Are you sure, you want to logout
                        </ModalPara>
                      </ButtonsDiv>
                      <ButtonsDiv>
                        <ConfirmButton
                          border="#7e858e solid 1px"
                          color="#7e858e"
                          bgColor="transparent"
                          type="button"
                          onClick={() => close()}
                        >
                          Cancel
                        </ConfirmButton>
                        <ConfirmButton
                          border="none"
                          color="white"
                          bgColor="#3b82f6"
                          onClick={this.logout}
                        >
                          Confirm
                        </ConfirmButton>
                      </ButtonsDiv>
                    </PopUpView>
                  )}
                </Popup>
              </HeaderContentsLargeContainer>
            </HeaderContainer>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}
export default withRouter(Header)
