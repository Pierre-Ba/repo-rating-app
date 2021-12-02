import { useMutation,  } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useCreateUser  = () => {
  const [create, result] = useMutation(CREATE_USER, {
      onError: (error) => {
          console.log('ERROR DURING CREATE USER MUTATION', error.graphQLErrors[0].message);
      }
  });

  // eslint-disable-next-line no-unused-vars
  const createUser = async ({username, password, passConfirm }) => {
      const { data } = await create({
          variables: {
              user: {
                  username,
                  password
              }
          }
      });
      return { data } ;
  };
 
  return [createUser, result];

};

export default useCreateUser;