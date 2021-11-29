import { useMutation, useApolloClient } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";



const useSignIn = () => {
    const apolloClient = useApolloClient();
    
    
  
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(SIGN_IN, {
        onError: (error) => {
            console.log('ERROR in useSignIn hook', error);
            
        }
    });
  
    const signIn = async ({ username, password }) => {
      
      const { data } = await mutate({ variables: { credentials: { username, password }}});
      
      
      await authStorage.setAccessToken(data.authorize.accessToken);
      const token = await authStorage.getAccessToken();
      console.log('TOKEN TAKEN FROM THE STORAGE: ', token);
      await apolloClient.resetStore();
      return { data };
    };

   
   
    
    return [signIn, result];
  };

  export default useSignIn;