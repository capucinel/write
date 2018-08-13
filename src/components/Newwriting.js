import React from 'react'
import './Writing.css'
import { Button, Modal, Header, Icon, Form, Image } from 'semantic-ui-react'
import { actions } from '../store.js'
import { Router, navigate, Link, Redirect } from '@reach/router'


const Newwriting = ({ onClick, valueTitle, getThemes, valueText, onSubmit, open, onClose }) => {
  const themeSelect = getThemes.map(theme => theme.nom_theme)
  const idThemeSelect = getThemes.map(theme => theme.id_theme)
  return (
  <React.Fragment>
<Modal open={open} onClose={() => navigate(`/`)}>
<Modal.Header>Ajouter un post</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='/images/wireframe/image.png' />
      <Modal.Description>
        <Header>Écris quelque chose</Header>
        <p>Choisis un thème, un titre et raconte ton histoire !</p>
        <Form onSubmit={e => {
        onSubmit(e)
        onClose() }}>
    <Form.Field>
      <label>Titre : </label>
      <input
      onChange={e => actions.titleForm(e.target.value)}
      value={valueTitle}
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
      <Form.Field label='Texte :' control='textarea' rows='6' onChange={e => actions.textForm(e.target.value)} value={valueText}/>
      
      <Button primary>
        Proceed <Icon name='right chevron' />
      </Button>
      
  </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>

    </Modal.Actions>
  </Modal>
  </React.Fragment>
  )
}

export default Newwriting

