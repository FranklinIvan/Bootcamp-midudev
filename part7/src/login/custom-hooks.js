import { useMutation } from "@apollo/client"
import { LOGIN } from "./graphql-mutations"

export const useLogin = ({notifyError}) =>{
  const result = useMutation(LOGIN, {
    onError: error => {
      notifyError(error.graphQLErrors[0].message)
    }
  })
  return result
}