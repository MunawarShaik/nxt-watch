import React from 'react'

const AppTheme = React.createContext({
  activeTheme: 'light',
  savedVideos: [],
  onAddVideo: () => {},
  onRemoveVideo: () => {},
})
export default AppTheme
