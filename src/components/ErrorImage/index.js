import {ErrorContainer, Para, Head, Button, ErrorImg} from './styledComponents'

import AppTheme from '../../context/Theme'

const ErrorImage = () => (
  <AppTheme.Consumer>
    {value => {
      const {activeTheme} = value
      const refreshPage = () => {
        // eslint-disable-next-line no-undef
        props.refresh()
      }
      return (
        <ErrorContainer>
          {activeTheme === 'light' ? (
            <ErrorImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt="failure view"
            />
          ) : (
            <ErrorImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
              alt="failure view"
            />
          )}
          <Head>Oops! Something Went Wrong</Head>
          <Para>
            We are having some trouble to complete your request. Please try
            again.
          </Para>
          <Button onClick={refreshPage}>retry</Button>
        </ErrorContainer>
      )
    }}
  </AppTheme.Consumer>
)

export default ErrorImage
