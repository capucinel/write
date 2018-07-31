import React, { Component } from 'react'
import './Write.css'
import Post from '../components/Post.js'
import ModalNewWrite from '../components/ModalNewWrite.js'
import { Button, Header, Icon, Image, Modal, Form } from 'semantic-ui-react'
import Select from 'react-select'


class Write extends Component {
    state = {
        posts: [],
        content: [],
        idContent: '',
        idDelete: '',
        deleteRaw: [],
        themes: []
    }    

  componentDidMount() {
    fetch('http://localhost:4444/themes')
      .then(res => res.json())
      .then(res => this.setState({themes: res}))
  }

    handleChange = (selectedOption) => {
      this.setState({ selectedOption })
      console.log(`Option selected:`, selectedOption)
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
        <Form>
    <Form.Field>
      <label>Titre : </label>
      <input placeholder='Exemple : Le sexisme chez les escargots' />
    </Form.Field>
    <Form.Field label='Thème :' control='select'>
      <option value={themeSelect[0]}>{themeSelect[0]}</option>
      <option value={themeSelect[1]}>{themeSelect[1]}</option>
      <option value={themeSelect[2]}>{themeSelect[2]}</option>
      <option value={themeSelect[3]}>{themeSelect[3]}</option>
      <option value={themeSelect[4]}>{themeSelect[4]}</option>
      <option value={themeSelect[5]}>{themeSelect[5]}</option>
      <option value={themeSelect[6]}>{themeSelect[6]}</option>
      </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary>
        Proceed <Icon name='right chevron' />
      </Button>
    </Modal.Actions>
  </Modal>

            
            {post}
            </div>
          )
    }
}

export default Write
