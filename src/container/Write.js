import React, { Component } from 'react'
import './Write.css'
import Post from '../components/Post.js'
import ModalNewWrite from '../components/ModalNewWrite.js'
import { Button, Header, Icon, Image, Modal, Form } from 'semantic-ui-react'

class Write extends Component {
  state = {
    posts: [],
    content: [],
    idContent: '',
    idDelete: '',
    deleteRaw: [],
    themes: [],
    titreForm: '',
    idThemeForm: 1,
    texteForm: '',
    flash: '',
    open: false
  }

  componentDidMount() {
    fetch('http://localhost:4444/themes')
      .then(res => res.json())
      .then(res => this.setState({themes: res}))
  }

  updateValueTitle = (e) => {
    this.setState({
      titreForm: e.target.value
    })
    console.log(this.state.titreForm)
  }

  updateValueTheme = (e) => {
    console.log(e.target.value)
    this.setState({
      idThemeForm: e.target.value
    })
    console.log(this.state.idThemeForm)
  }

  updateValueTexte = (e) => {
    this.setState({
      texteForm: e.target.value
    })
    console.log(this.state.texteForm)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:4444/newwrite', {
       method: 'POST',
       headers: new Headers({
           'Content-Type': 'application/json'
       }),
       body: JSON.stringify(this.state)
   })
   .then(res => res.json())
   .then(
       res => this.setState({
           'flash': res.flash,
           'open': true
       }),
       err => this.setState({
           'flash': err.flash, 'open': true
       })
   )
}

  readMore = (id) => {
    const content = this.state.posts.find(elem => elem.id_writings === id).content
    this.setState({content: content})
    this.setState({idContent: id})
  }

  deleteBtn = (id) => {
    this.setState({idDelete: id})
  }

  deleteWriting = (id) => {
    fetch(`http://localhost:4444/writings/delete/id=${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })

    const postToDelete = this.state.posts.find(elem => elem.id_writings === id)
    const i = this.state.posts.indexOf(postToDelete)
    this.state.posts.splice(i, 1)
    this.setState({posts : this.state.posts})
  }

  render() {
    const themeSelect = this.state.themes.map(theme => theme.nom_theme)
    const idThemeSelect = this.state.themes.map(theme => theme.id_theme)

    const post = this.state.posts.map(w =>
       <Post
        key={w.id_writings}
        date={w.creation_date}
        theme={w.nom_theme}
        titre={w.title}
        image={w.media_url}
        contentPreview={w.content.split(' ').slice(0, 26).join(' ') + '...'}
        readMore={this.readMore}
        id={w.id_writings}
        content={this.state.content}
        idContent={this.state.idContent}
        deleteBtn={this.state.idDelete}
        deleteWriting={this.deleteWriting}
         />)
       return (
            <div className='WritContainer'>

 <Modal trigger={<Button> + new write</Button>}>

<Modal.Header>Ajouter un post</Modal.Header>

    <Modal.Content image>
      <Image wrapped size='medium' src='/images/wireframe/image.png' />
      <Modal.Description>
        <Header>Écris quelque chose</Header>
        <p>Choisis un thème, un titre et raconte ton histoire !</p>
        <Form onSubmit={this.handleSubmit}>
    <Form.Field>
      <label>Titre : </label>
      <input
      onChange={this.updateValueTitle}
      value={this.state.titreForm}
      placeholder='Exemple : Le sexisme chez les escargots' />
    </Form.Field>
    <Form.Field label='Thème :' control='select' onChange={this.updateValueTheme}>
      <option value={idThemeSelect[0]} onChange={this.updateValueTheme}>{themeSelect[0]}</option>
      <option value={idThemeSelect[1]} onChange={this.updateValueTheme}>{themeSelect[1]}</option>
      <option value={idThemeSelect[2]} onChange={this.updateValueTheme}>{themeSelect[2]}</option>
      <option value={idThemeSelect[3]} onChange={this.updateValueTheme}>{themeSelect[3]}</option>
      <option value={idThemeSelect[4]} onChange={this.updateValueTheme}>{themeSelect[4]}</option>
      <option value={idThemeSelect[5]} onChange={this.updateValueTheme}>{themeSelect[5]}</option>
      <option value={idThemeSelect[6]} onChange={this.updateValueTheme}>{themeSelect[6]}</option>
      </Form.Field>
      <Form.Field label='Texte :' control='textarea' rows='6' onChange={this.updateValueTexte} value={this.state.texteForm}/>
      <Button primary>
        Proceed <Icon name='right chevron' />
      </Button>
  </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>

    </Modal.Actions>
  </Modal>

            
            {post}
            </div>
          )
    }
}

export default Write
