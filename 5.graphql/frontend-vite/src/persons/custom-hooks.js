import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { ALL_PERSONS, FIND_PERSON } from "./graphql-queries"
import { ADD_PERSON, EDIT_NUMBER } from "./graphql-mutations"

export const usePersons = () => {
  const result = useQuery(ALL_PERSONS)
  return result
}

export const useFindPerson = () => {
  const result = useLazyQuery(FIND_PERSON)
  return result
}

export const useAddPerson = ({ notifyError }) => {
  const result = useMutation(ADD_PERSON, {
    onError: ({graphQLErrors}) => notifyError(graphQLErrors[0].message),
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_PERSONS })
      store.writeQuery({
        query: ALL_PERSONS,
        data: {
          ...dataInStore,
          allPersons: [
            ...dataInStore.allPersons,
            response.data.addPerson
          ]
        }
      })
    }
  })
  return result
}

export const useEditNumber = ({ notifyError }) => {
  const result = useMutation(EDIT_NUMBER, {
    onError: ({graphQLErrors}) => notifyError(graphQLErrors[0].message)
  })
  return result
}