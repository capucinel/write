import React, { Component } from 'react'

import Navbar from '../components/Navbar.js'
import Writing from '../components/Writing.js'
import Newwriting from '../components/Newwriting.js'
import { actions } from '../store.js'
import { navigate, Link } from '@reach/router'
import { Button, Dropdown } from 'semantic-ui-react'

class Writings extends Component {
  componentDidMount() {
    fetch('http://localhost:4000/writings')
    .then(res => res.json())
    .then(writings => actions.loadWritings(writings))
  }

  
  render() {
    const contentValue = c => {
      if (c === '' || c === null || c === undefined || c.length < 26) {
        return
        } else {
        return c.split(' ').slice(0, 26).join(' ')
        }
       }
  
      const content = c => {
      if (c === '' || c === null || c === undefined || c.length < 26) {
        return
      } else {
        return c.split(' ').slice(26, 12000).join(' ')
        }
      }

      const themeSelect = this.props.themes.map(theme => theme.nom_theme)
      const idThemeSelect = this.props.themes.map(theme => theme.id_theme)

      const themesOptions = [
        {
          text: themeSelect[0],
          value: idThemeSelect[0]
        },
        {
          text: themeSelect[1],
          value: idThemeSelect[1]
        },        {
          text: themeSelect[2],
          value: idThemeSelect[2]
        },        {
          text: themeSelect[3],
          value: idThemeSelect[3]
        },        {
          text: themeSelect[4],
          value: idThemeSelect[4]
        },        {
          text: themeSelect[5],
          value: idThemeSelect[5]
        }

      ]
      const writing = this.props.writings.map(w =>
        <Writing
          key={w.id_writings}
          date={w.creation_date}
          theme={w.nom_theme}
          titre={w.title}
          image={w.media_url}
          contentPreview={contentValue(w.content)}
          content={content(w.content)}
          idContent={this.props.idContent}
          id={w.id_writings}
           />)
      const writingFilter = this.props.writings
      .filter(theme => this.props.dropdownTheme === theme.id_theme)
      .map(w =>
        <Writing
          key={w.id_writings}
          date={w.creation_date}
          theme={w.nom_theme}
          titre={w.title}
          image={w.media_url}
          contentPreview={contentValue(w.content)}
          content={content(w.content)}
          idContent={this.props.idContent}
          id={w.id_writings}
           />)
           
let writingToReturn = ''
if (this.props.dropdownTheme !== '') {
  writingToReturn = writingFilter
} else {
  writingToReturn = writing
}
           
    return (
      <div>
        <Navbar />
        <Link to={'/newwrite'}>
<Button> + new write</Button>
</Link>
<Newwriting
          valueTitle={this.props.titleField}
          onChangeTitle={actions.titleForm}
          getTheme={themeSelect}
          getThemeId={idThemeSelect}
          onChangeTheme={actions.themeForm}
          valueText={this.props.textField}
          onChangeText={actions.textForm}
          onSubmit={actions.addWritting}
          open={this.props.edit}
          onClose={() => navigate(`/`)}
          />
Show me theme :
    <Dropdown inline options={themesOptions} defaultvalue={this.props.dropdownTheme} onChange={(e, { value }) => actions.dropdownTheme(value)}/>


          
          {writingToReturn}
      </div>
    
        )
    }
  }
  

export default Writings
