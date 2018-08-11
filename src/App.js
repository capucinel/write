import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Router } from '@reach/router'
import { store, actions } from './store.js'
import Writings from './container/Writings.js'
import Newwriting from './components/Newwriting.js'
import Writing from './components/Writing.js'

class App extends Component {
  constructor() {
    super()
    this.state = store.getState()
    store.subscribe(() => {
      this.setState(store.getState())
    })
  }
  render() {
    return (

      <Router>
        <Writings {...this.state} path='/' />
        <Writings {...this.state} edit path='/newwrite' />


        <Writing {...this.state} remove path='/writing/:id/remove' />
      </Router>

    )
  }
}

export default App
