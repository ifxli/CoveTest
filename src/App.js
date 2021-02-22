import React from 'react'
import Container from '@navigators/AppContainer'
import { Provider } from 'react-redux'
import store from '@store/index'

const App = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  )
}

export default App
