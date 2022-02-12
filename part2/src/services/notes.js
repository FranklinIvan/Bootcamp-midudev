import axios from 'axios'
const baseURL = 'http://localhost:3001/api/notes'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (newObject, {token}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const request = axios.post(baseURL, newObject, config)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }