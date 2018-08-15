import { createStore } from 'redux'

const initialState = {
  writings: [],
  triDate: [],
  content: [],
  idContent: '',
  themes: [],
  titleField: '',
  idTheme: 1,
  themeField:'',
  textField: '',
  flash: '',
  dropdownTheme: ''
}

const reducer = (state, action) => {
  if (action.type === 'LOAD_WRITINGS') {
      return {
        ...state,
        writings: action.writings
      }
  }
  
  if (action.type === 'READ_MORE') {
    const content = state.writings.find(elem => elem.id_writings === action.idContent).content

    return {
      content: content,
      idContent: action.idContent
    }
  }    if (action.type === 'DELETE_WRITING') {
    const id = action.writing
    const postToDelete = state.writings.find(elem => elem.id_writings === id)
    const i = state.writings.indexOf(postToDelete)
    state.writings.splice(i, 1)
    

    fetch(`http://localhost:4000/writings/delete/id=${id}`, {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
     })

    return {
      writings: [ ...state.writings ]
    }
  }

  if (action.type === 'LOAD_THEMES') {
    return {
      ...state,
      themes: action.themes
    }
  }

  if (action.type === 'TITLE_FORM') {
    return {
      ...state,
      titleField: action.title
     
    }
  }

  if (action.type === 'THEME_FORM') {
    return {
      ...state,
      idTheme: action.idTheme
  }
}

  if (action.type === 'TEXT_FORM') {
    return {
      ...state,
      textField: action.text
      
  }
}

  if (action.type === 'ADD_WRITING') {
    console.log('cliqué')

    action.newWriting.preventDefault()
    fetch('http://localhost:4000/newwrite', {
     method: 'POST',
     headers: new Headers({
       'Content-Type': 'application/json'
     }),
     body: JSON.stringify(state)
   })
   .then(res => res.json())
    
    .then(window.location.reload())
   
   return {
    ...state,
    writings: state.writings
    }
   }
  
    if (action.type === 'THEME_SELECTED') {
    return {
      ...state,
      dropdownTheme: action.theme
  }
}

  return state
}

export const store = createStore(reducer, initialState)

export const actions = {
  loadWritings: writings => store.dispatch({ type: 'LOAD_WRITINGS', writings }),
  readMoreBtn: (idContent, content) => store.dispatch({ type: 'READ_MORE', idContent, content }),
  deleteWriting: writing => store.dispatch({ type: 'DELETE_WRITING', writing }),
  loadThemes: themes => store.dispatch({ type: 'LOAD_THEMES', themes }),
  titleForm: title => store.dispatch({ type: 'TITLE_FORM', title }),
  themeForm: idTheme => store.dispatch({ type: 'THEME_FORM', idTheme }),
  textForm: text => store.dispatch({ type: 'TEXT_FORM', text }),
  addWritting: newWriting => store.dispatch({ type: 'ADD_WRITING', newWriting }),
  dropdownTheme: theme => store.dispatch({ type: 'THEME_SELECTED', theme })

}

fetch('http://localhost:4000/themes')
  .then(res => res.json())
  .then(themes => actions.loadThemes(themes))

