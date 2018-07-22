import React from 'react'
import './Post.css'
import { Button, Modal, Header, Icon } from 'semantic-ui-react'
import { navigate, Link } from '@reach/router'

const Post = ({ date, theme, titre, image, contentPreview, readMore, id, content, idContent, deleteBtn, deleteWriting }) => {
  let fullContent = ''
    if (id === idContent) {
        fullContent = content
    }
    else {
    
    fullContent = <button onClick={() => readMore(id)}>Read more</button>
    }
   return (
<div className="Post">
    <div className='PostHeader'>
    {date}
    </div>
    <div className='PostHeader'>
    {theme}
    </div>
    <div className='PostHeader'>
    {titre}
    </div>
    <div className='PostHeader'>
    {image}
    </div>
    <div className='PostHeader'>
      {contentPreview}
      {fullContent}
    </div>

    <React.Fragment>

              <Modal trigger={<Button basic color='red'>Delete</Button>} basic size='small' onClose={() => navigate('/')}>
                <Header icon='archive' content={`Are you sure you want to delete this writing "${titre}" ?`} />
                <Modal.Content>
      <p>
        Your inbox is getting full, would you like us to enable automatic archiving of old messages?
      </p>
    </Modal.Content>
                <Modal.Actions>
                  <Button basic inverted onClick={() => navigate('/writings/remove')}>
                    <Icon name='remove' /> Cancel
                  </Button>
                  <Button inverted
                    color='red'
                    onClick={() => {
                    deleteWriting(id)
                    }}>
                    <Icon name='checkmark' /> Confirm Delete
                  </Button>
                </Modal.Actions>
              </Modal>
            </React.Fragment>

</div>
     )
}

export default Post
