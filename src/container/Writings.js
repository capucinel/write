import React, { Component } from 'react'

import Navbar from '../components/Navbar.js'
import Writing from '../components/Writing.js'
import Newwriting from '../components/Newwriting.js'
import { actions, store } from '../store.js'
import { Redirect, navigate, Link } from '@reach/router'
import { Button, Modal, Header, Icon, Image, Form } from 'semantic-ui-react'

class Writings extends Component {
  componentDidMount() {
    fetch('http://localhost:3333/writings')
    .then(res => res.json())
    .then(writings => actions.loadWritings(writings))
  }

  
  render() {
    console.log(this.props.writings)
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
           

           
    return (
      <div>
        <Navbar />
        <Link to={'/newwrite'}>
<Button> + new write</Button>
</Link>
<Newwriting
          valueTitle={this.props.titleField}
          onChangeTitle={actions.titleForm}
          getThemes={this.props.themes}
          onChangeTheme={actions.themeForm}
          valueText={this.props.textField}
          onChangeText={actions.textForm}
          onSubmit={actions.addWritting}
          open={this.props.edit}
          onClose={() => navigate(`/`)}
          />
{console.log(this.props.writing)}

{console.log(this.props.writings)}


          
          {writing}
      </div>
    
        )
    }
  }
  

export default Writings
