import React, { Component } from 'react'
import './Write.css'
import Post from '../components/Post.js'

class Write extends Component {
    state = {
        posts: [],
        content: [],
        idContent: '',
        idDelete: '',
        deleteRaw: []
    }

  componentDidMount() {
    fetch('http://localhost:3333/writings')
      .then(res => res.json())
      .then(res => this.setState({posts : res}))
    }

  readMore = (id) => {
    const content = this.state.posts.find(elem => elem.id_writings === id).content
    this.setState({content: content})
    this.setState({idContent: id})
  }

  deleteBtn =(id) => {
    this.setState({idDelete: id})
  }

  deleteWriting = (id) => {
    fetch(`http://localhost:3333/writings/delete/id=${id}`, {
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
      const post = this.state.posts.map(w =>
       <Post
        key={w.id_writings}
        date={w.creation_date}
        theme={w.id_theme}
        titre={w.titre}
        image={w.image_url}
        contentPreview={w.content.split(' ').slice(0, 26).join(' ') + '...'}
        readMore={this.readMore}
        id={w.id_writings}
        content={this.state.content}
        idContent={this.state.idContent}
        deleteBtn={this.state.idDelete}
        deleteWriting={this.deleteWriting}
         />)

          return (
      <div className='WriteContainer'>
            {post}
            {console.log(this.state.deleteRaw)}
            </div>
          )
    }
}

export default Write
