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
           const themeSelect = this.props.themes.map(theme => theme.nom_theme)
           const idThemeSelect = this.props.themes.map(theme => theme.id_theme)

           
    return (
      <div>
        <Navbar />
        <Link to={'/newwrite'}>
<Button> + new write</Button>
</Link>


          <Modal open={this.props.edit} onClose={() => navigate(`/`)}>
<Modal.Header>Ajouter un post</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='/images/wireframe/image.png' />
      <Modal.Description>
        <Header>Écris quelque chose</Header>
        <p>Choisis un thème, un titre et raconte ton histoire !</p>
        <Form onSubmit={actions.addWritting}>
    <Form.Field>
      <label>Titre : </label>
      <input
      onChange={e => actions.titleForm(e.target.value)}
      value={this.props.titleField}
      placeholder='Exemple : Le sexisme chez les escargots' />
    </Form.Field>
    <Form.Field label='Thème :' control='select' onChange={e => actions.themeForm(e.target.value)}>
      <option value={idThemeSelect[0]} onChange={e => actions.themeForm(e.target.value)}>{themeSelect[0]}</option>
      <option value={idThemeSelect[1]} onChange={e => actions.themeForm(e.target.value)}>{themeSelect[1]}</option>
      <option value={idThemeSelect[2]} onChange={e => actions.themeForm(e.target.value)}>{themeSelect[2]}</option>
      <option value={idThemeSelect[3]} onChange={e => actions.themeForm(e.target.value)}>{themeSelect[3]}</option>
      <option value={idThemeSelect[4]} onChange={e => actions.themeForm(e.target.value)}>{themeSelect[4]}</option>
      <option value={idThemeSelect[5]} onChange={e => actions.themeForm(e.target.value)}>{themeSelect[5]}</option>
      <option value={idThemeSelect[6]} onChange={e => actions.themeForm(e.target.value)}>{themeSelect[6]}</option>
      </Form.Field>
      <Form.Field label='Texte :' control='textarea' rows='6' onChange={e => actions.textForm(e.target.value)} value={this.props.textField}/>
      <Button primary onClick = {() => navigate('/')}>
        Proceed <Icon name='right chevron' />
      </Button>
  </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>

    </Modal.Actions>
  </Modal>

          {writing}
      </div>
    
        )
    }
  }
  

export default Writings
