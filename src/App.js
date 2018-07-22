import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import Navbar from './components/Navbar.js'
import Write from './container/Write.js'
import { Router } from '@reach/router'

class App extends Component {
render() {
return (
  <div>
  <Navbar />
  <Router>
    <Write path='/'>
    </Write>
    <Write remove path='/writings/remove'>
    
    </Write>
      </Router>
</div>
)
}
}

export default App
