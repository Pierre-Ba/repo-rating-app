import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN, {
        onError: (error) => {
            console.log('ERROR in useSignIn hook', error);
            
        }
    });
  
    const signIn = async ({ username, password }) => {
      console.log('USERNAME IN THE SIGN IN FUNCTION', username);
      console.log('PASSWORD IN THE SIGN IN FUNCTION', password);
      const data = await mutate({ variables: { credentials: { username, password }}});
      return data
    };
    
    return [signIn, result];
  };

  export default useSignIn;