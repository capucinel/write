import { createStore } from 'redux'

const initialState = {
    writings: [],
    content: [],
    idContent: ''
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

        return {
            writings: [ ...state.writings ]
        }
    }

    return state
}


export const store = createStore(reducer, initialState)

export const actions = {
    loadWritings: writings => store.dispatch({ type: 'LOAD_WRITINGS', writings }),
    readMoreBtn: (idContent, content) => store.dispatch({ type: 'READ_MORE', idContent, content }),
    deleteWriting: writing => store.dispatch({ type: 'DELETE_WRITING', writing })
}


