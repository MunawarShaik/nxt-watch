import {Component} from 'react'
import './App.css'
import {Switch, Route} from 'react-router-dom'
import AppTheme from './context/Theme'
import Login from './components/LoginForm'
import Header from './components/Header'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoCard from './components/VideoCard'
import NotFound from './components/NotFound'
import Navbar from './components/Navbar'

class App extends Component {
  state = {
    activeTheme: 'light',
    savedVideos: [],
  }

  changeTheme = activeTheme => {
    this.setState({activeTheme})
  }

  addSavedVideos = async data => {
    const {savedVideos} = this.state
    if (savedVideos.length > 0) {
      const checkSavedVideos = savedVideos.filter(item => item.id === data.id)
      if (checkSavedVideos.length === 0) {
        await this.setState({
          savedVideos: [...savedVideos, data],
        })
      }
    } else {
      await this.setState({
        savedVideos: [...savedVideos, data],
      })
    }
  }

  render() {
    const {activeTheme, savedVideos} = this.state
    const bgColor = activeTheme === 'light' ? 'light' : 'dark'
    return (
      <AppTheme.Provider
        value={{
          activeTheme,
          savedVideos,
          addSavedVideos: this.addSavedVideos,
          changeTheme: this.changeTheme,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <div className={`main-container ${bgColor}`}>
              <Header />
              <div className="bottom-container">
                <Navbar />
                <>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/trending" component={Trending} />
                    <Route exact path="/gaming" component={Gaming} />
                    <Route exact path="/saved-videos" component={SavedVideos} />
                    <Route exact path="/videos/:id" component={VideoCard} />
                    <Route exact path="/bad-path" component={NotFound} />
                    <Route component={NotFound} />
                  </Switch>
                </>
              </div>
            </div>
          </Switch>
        </>
      </AppTheme.Provider>
    )
  }
}
export default App
