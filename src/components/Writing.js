import React from 'react'
import './Writing.css'
import { Button, Modal, Header, Icon } from 'semantic-ui-react'
import { navigate, Link } from '@reach/router'
import { store, actions } from '../store.js'

const Writing = ({ date, theme, titre, image, contentPreview, id, content, idContent }) => {
  let fullContent = ''
    if (id === idContent) {
        fullContent = content
    }
    else {
    
    fullContent = <button onClick={() => actions.readMoreBtn(id)}>Read more</button>
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
                    actions.deleteWriting(id)
                    }}>
                    <Icon name='checkmark' /> Confirm Delete
                  </Button>
                </Modal.Actions>
              </Modal>
            </React.Fragment>

</div>
     )
}

export default Writing
