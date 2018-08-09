import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import Navbar from './components/Navbar.js'
import Writing from './components/Writing.js'
import Newwriting from './components/Newwriting.js'

import { store, actions } from './store.js'

class App extends Component {

  constructor() {
    super()
    this.state = store.getState()
    store.subscribe(() => {
      this.setState(store.getState())
    })
  }
  componentDidMount() {
    fetch('http://localhost:3333/writings')
    .then(res => res.json())
    .then(writings => actions.loadWritings(writings))
  }

  render() {
    const contentValue = c => {
      if (c === '' || c === null || c.length < 26) {
        return
      } else {
        return c.split(' ').slice(0, 26).join(' ')
      }
    }

    const content = c => {
      if (c === '' || c === null || c.length < 26) {
        return
      } else {
        return c.split(' ').slice(26, 12000).join(' ')
      }
    }

    const themeSelect = this.state.themes.map(theme => theme.nom_theme)
    const idThemeSelect = this.state.themes.map(theme => theme.id_theme)

    const writing = this.state.writings.map(w =>
      <Writing
       key={w.id_writings}
       date={w.creation_date}
       theme={w.nom_theme}
       titre={w.title}
       image={w.media_url}
       contentPreview={contentValue(w.content)}
       content={content(w.content)}
       idContent={this.state.idContent}
       id={w.id_writings}
        />)
        
    return (
      <React.Fragment>
        <Navbar />
        <Newwriting
      valueTitle={this.state.titleField}
      onChangeTitle={actions.titleForm}
      themeSelect={themeSelect}
      idThemeSelect={idThemeSelect}
      onChangeTheme={actions.themeForm}
      valueText={this.state.textField}
      onChangeText={actions.textForm}
      addWritting={actions.addWritting}
      writings={this.state.writings} />
       {writing}
    
       </React.Fragment>
    )
  }
}

export default App
