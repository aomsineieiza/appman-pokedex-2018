import React, { Component } from 'react'
import './App.css'
import MainPage from './page/MainPage'
import CardContextProvider from './context/CardContext'
import { ThemeProvider } from 'styled-components'

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b",
  cardBoxShadow: "#d5d6dc",
  cardBoxShadowHover: "#aeaeae",
  cardBackground: "#f3f4f7",
  colorAddButton: "#dc7777",
  bottomBarBackground: "#ec5656",
  levelTubeBackground: "#e4e4e4",
  levelTubeValueBackground: "#f3701a",
  modalOutside: "#000000a3",
  modalContentBoxShadow: "#474444",
  modalContentBackground: "#ffffff",
  searchBoxBorder: "#e6e6e6"
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={{ colors: COLORS }}>
          <CardContextProvider>
            <MainPage />
          </CardContextProvider>
        </ThemeProvider>
      </div>
    )
  }
}

export default App
