import { useApolloClient, useMutation } from "@apollo/client"
import { LOGIN } from "./graphql-mutations"

export const useLogin = ({notifyError}) =>{
  const result = useMutation(LOGIN, {
    onError: ({graphQLErrors}) => notifyError(graphQLErrors[0].message)
  })
  return result
}

export const useLogout = () => {
  const result = useApolloClient()
  return result
}