import axios from 'axios'
import { v1 as uuid } from 'uuid'
const baseUrl = 'http://localhost:3000/persons'

const getAllPersons = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const getOnePerson = async name => {
  const persons = await getAllPersons()
  const person = persons.find(person => person.name === name)
  return person
}

const addNewPerson = async newObject => {
  const newPerson = {
    ...newObject,
    id: uuid()
  }
  const { data } = await axios.post(baseUrl, newPerson)
  return data
}

const uptadePerson = async args => {
  const person = await getOnePerson(args.name)
  const changedPerson = {
    ...person,
    phone: args.phone
  }
  const { data } = await axios.put(`${baseUrl}/${changedPerson.id}`, changedPerson)
  return data
}

export default { getAllPersons, getOnePerson, addNewPerson, uptadePerson }
