import axios from "axios";

export const createNote = (newNoteToAddToState) => {
    return axios.post('https://jsonplaceholder.typicode.com/posts', newNoteToAddToState)
    .then(response => {
    const { data } = response
    return data
    })
}