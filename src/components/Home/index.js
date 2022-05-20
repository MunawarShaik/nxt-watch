import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {RiCloseLine} from 'react-icons/ri'
import LoaderComp from '../LoaderComp'

import './index.css'

import AppTheme from '../../context/Theme'

import ErrorImage from '../ErrorImage'

import {
  HomeContainer,
  HeadDiv,
  SearchIp,
  ButtonEl,
  ListContainer,
  ListItem,
  ImageTag,
  ContentDiv,
  ParaTag,
  NoVideosImage,
  NoResults,
  NoResultsHeading,
  NoResultsPara,
  NoResultsButton,
  BannerDiv,
  BannerContentDiv,
  ImageEl,
} from './styledComponents'

class Home extends Component {
  state = {
    dataArray: [],
    isLoading: true,
    status: '',
    searchInput: '',
    displayBanner: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        // console.log(data)
        const updatedData = data.videos.map(eachVideo => ({
          id: eachVideo.id,
          channelName: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
          publishedAt: eachVideo.published_at,
          thumbnailUrl: eachVideo.thumbnail_url,
          title: eachVideo.title,
          viewCount: eachVideo.view_count,
        }))
        //   console.log(updatedData)
        this.setState({dataArray: updatedData, status: true})
      }
    } catch {
      this.setState({status: false})
    }
    this.setState({isLoading: false})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = () => {
    const {searchInput} = this.state
    this.getVideos(searchInput)
  }

  onEnterKey = event => {
    if (event.key.toLowerCase() === 'enter') {
      this.onSearch()
    }
  }

  retry = () => {
    this.getVideos()
  }

  hideBanner = () => {
    this.setState({displayBanner: false})
  }

  render() {
    const {
      dataArray,
      status,
      isLoading,
      searchInput,
      displayBanner,
    } = this.state
    const searchResults = dataArray.map(
      eachVideo => eachVideo.title.toLowerCase() === searchInput.toLowerCase(),
    )
    // console.log(searchResults)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value
          const color = activeTheme === 'light' ? '#000000' : '#ffffff'
          const bgColor = activeTheme === 'light' ? '#f9f9f9' : '#181818'

          return (
            <HomeContainer
              data-testid="home"
              bgColor={`${bgColor}`}
              color={`${color}`}
            >
              {displayBanner ? (
                <BannerDiv>
                  <BannerContentDiv data-testid="banner">
                    <ImageEl
                      height="25px"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="nxt watch logo"
                      cursor="pointer"
                    />
                    <ParaTag>
                      Buy Nxt Watch Premium prepaid plans with UPI
                    </ParaTag>
                    <ButtonEl>GET IT NOW</ButtonEl>
                  </BannerContentDiv>
                  <BannerContentDiv>
                    <ButtonEl
                      type="button"
                      data-testid="close"
                      onClick={this.hideBanner}
                    >
                      <RiCloseLine />
                    </ButtonEl>
                  </BannerContentDiv>
                </BannerDiv>
              ) : null}

              {isLoading ? (
                <LoaderComp />
              ) : (
                <>
                  {status ? (
                    <>
                      <HeadDiv color={`${color}`} bgColor={`${bgColor}`}>
                        <SearchIp
                          color={`${color}`}
                          bgColor={`${bgColor}`}
                          value={searchInput}
                          onChange={this.onChangeSearchInput}
                          placeholder="search"
                          type="search"
                          onKeyDown={this.onEnterKey}
                        />
                        <ButtonEl
                          color={`${color}`}
                          bgColor={`${bgColor}`}
                          onClick={this.onSearch}
                          data-testid="searchButton"
                        >
                          <AiOutlineSearch size={20} />
                        </ButtonEl>
                      </HeadDiv>
                      <>
                        {searchResults.length === 0 ? (
                          <NoResults>
                            <NoVideosImage
                              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                              alt="no videos"
                            />
                            <NoResultsHeading>
                              No Search results found
                            </NoResultsHeading>
                            <NoResultsPara>
                              Try different key words or remove search filter
                            </NoResultsPara>
                            <NoResultsButton onClick={this.retry}>
                              Retry
                            </NoResultsButton>
                          </NoResults>
                        ) : (
                          <ContentDiv>
                            {dataArray.map(item => (
                              <Link
                                to={`/videos/${item.id}`}
                                className={
                                  activeTheme === 'light'
                                    ? 'link-light'
                                    : 'link-dark'
                                }
                                key={item.id}
                              >
                                <ListContainer>
                                  <ListItem>
                                    <ImageTag
                                      src={item.thumbnailUrl}
                                      width="100%"
                                      alt="video thumbnail"
                                    />
                                  </ListItem>
                                  <ListItem>
                                    <div className="logo-div">
                                      <ImageTag
                                        src={item.profileImageUrl}
                                        width="30px"
                                        alt="channel logo"
                                      />
                                    </div>
                                    <div>
                                      <ParaTag fontSize="15px">
                                        {item.title}
                                      </ParaTag>
                                      <ParaTag fontSize="12px">
                                        {item.channelName}
                                      </ParaTag>
                                      <ParaTag fontSize="12px">
                                        {`${item.viewCount} ${item.publishedAt}`}
                                      </ParaTag>
                                    </div>
                                  </ListItem>
                                </ListContainer>
                              </Link>
                            ))}
                          </ContentDiv>
                        )}
                      </>
                    </>
                  ) : (
                    <ErrorImage refresh={this.retry} />
                  )}
                </>
              )}
            </HomeContainer>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}
export default Home
