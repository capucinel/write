import React from 'react'
import './Navbar.css'
import { Menu } from 'semantic-ui-react'

class Navbar extends React.Component {
  render() {
    return (
      <Menu size="large" stackable>
        <Menu.Item name="write">
          write.
        </Menu.Item>

        <Menu.Item name="writings" position="right">
          writings
        </Menu.Item>

        <Menu.Item name="compte">
          mon compte
        </Menu.Item>
      </Menu>
    )
  }
}

export default Navbar

