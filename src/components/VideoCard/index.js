import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {Redirect} from 'react-router-dom'

import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'

import {
  VideoFrameContainer,
  VideoContainer,
  ParaEl,
  AttributesContainer,
  ChannelContainer,
  ImageEl,
  ContentContainer,
  IconParas,
} from './styledComponents'

import AppTheme from '../../context/Theme'

import './index.css'

import LoaderComp from '../LoaderComp'
import ErrorImage from '../ErrorImage'

class VideoCard extends Component {
  state = {
    videoDetails: {},
    channelDataObj: {},
    liked: false,
    disliked: false,
    saved: false,
    isLoading: true,
    status: '',
  }

  componentDidMount() {
    this.getData()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  getData = async () => {
    this.mounted = true
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const responseData = await response.json()
      const data = responseData.video_details
      const convertedData = {
        channel: data.channel,
        description: data.description,
        id: data.id,
        publishedAt: data.published_at,
        thumbnailUrl: data.thumbnail_url,
        title: data.title,
        videoUrl: data.video_url,
        viewCount: data.view_count,
      }
      const channelData = {
        name: data.channel.name,
        profileImageUrl: data.channel.profile_image_url,
        subscriberCount: data.channel.subscriber_count,
      }
      if (this.mounted) {
        await this.setState({
          videoDetails: convertedData,
          channelDataObj: channelData,
          status: true,
        })
      }
    } else {
      this.setState({status: false})
    }
    this.setState({isLoading: false})
  }

  retry = () => {
    this.getData()
  }

  isDisliked = () => {
    const {liked, disliked} = this.state
    if (liked) {
      this.setState({liked: false})
    }
    if (disliked) {
      this.setState({disliked: false})
    } else {
      this.setState({disliked: true})
    }
  }

  isLiked = () => {
    const {liked, disliked} = this.state
    if (disliked) {
      this.setState({disliked: false})
    }
    if (liked) {
      this.setState({liked: false})
    } else {
      this.setState({liked: true})
    }
  }

  isSaved = async () => {
    const {saved} = this.state
    if (saved) {
      await this.setState({saved: false})
    } else {
      await this.setState({saved: true})
    }
  }

  render() {
    const {
      videoDetails,
      channelDataObj,
      liked,
      disliked,
      saved,
      isLoading,
      status,
    } = this.state
    const {videoUrl, title, viewCount, publishedAt, description} = videoDetails
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <AppTheme.Consumer>
        {values => {
          const {activeTheme, addSavedVideos} = values
          const bgColor = activeTheme === 'light' ? '#ffffff' : '#0f0f0f'
          const color = activeTheme === 'light' ? '#000000' : '#ffffff'

          const onSave = () => {
            this.isSaved()
            addSavedVideos(videoDetails)
          }

          return (
            <VideoContainer
              data-testid="videoItemDetails"
              bgColor={bgColor}
              color={color}
            >
              {isLoading ? (
                <LoaderComp />
              ) : (
                <>
                  {status ? (
                    <div>
                      <VideoFrameContainer>
                        <ReactPlayer
                          alt="video thumbnail"
                          url={videoUrl}
                          controls
                          className="react-player"
                        />
                        <ParaEl>{title}</ParaEl>
                      </VideoFrameContainer>
                      <AttributesContainer>
                        <ParaEl>
                          {viewCount} views . {publishedAt}
                        </ParaEl>
                        <ChannelContainer color={color}>
                          <IconParas
                            onClick={this.isLiked}
                            iconColor={liked ? '#2563eb' : '#64748b'}
                          >
                            <AiOutlineLike size={20} /> Like
                          </IconParas>
                          <IconParas
                            onClick={this.isDisliked}
                            iconColor={disliked ? '#2563eb' : '#64748b'}
                          >
                            <AiOutlineDislike size={20} /> Dislike
                          </IconParas>
                          <IconParas
                            onClick={onSave}
                            iconColor={saved ? '#2563eb' : '#64748b'}
                          >
                            <MdPlaylistAdd size={20} />{' '}
                            {saved ? 'Saved' : 'Save'}
                          </IconParas>
                        </ChannelContainer>
                      </AttributesContainer>
                      <ChannelContainer>
                        <ImageEl
                          src={channelDataObj.profileImageUrl}
                          alt="channel logo"
                        />
                        <ContentContainer>
                          <ParaEl>{channelDataObj.name}</ParaEl>
                          <ParaEl>{channelDataObj.subscriberCount}</ParaEl>
                        </ContentContainer>
                      </ChannelContainer>
                      <ParaEl padding="30px">{description}</ParaEl>
                    </div>
                  ) : (
                    <ErrorImage render={this.retry} />
                  )}
                </>
              )}
            </VideoContainer>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default VideoCard
