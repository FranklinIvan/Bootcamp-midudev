import { useMutation, useQuery } from "@apollo/client"
import { ALL_PERSONS } from "./graphql-queries"
import { ADD_PERSON } from "./graphql-mutations"

export const usePersons = () => {
  const result = useQuery(ALL_PERSONS)
  return result
}

export const useAddPerson = ({ notifyError }) => {
  const result = useMutation(ADD_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: error => {
      notifyError(error.graphQLErrors[0].message)
    }
  })

  return result
}