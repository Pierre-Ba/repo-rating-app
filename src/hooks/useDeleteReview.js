import { useMutation  } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useApolloClient } from '@apollo/client';

const useDeleteReview = () => {
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(DELETE_REVIEW, {
        onError: (error) => {
            console.log('ERROR DURING DELETE REVIEW MUTATION', error);
        }
    });
  
    
    const deleteReview = async (id) => {
        const { data } = await mutate({
            variables: {
                id
            }
    
        });
         await apolloClient.resetStore();
        return { data } ;
    };
   
    return [deleteReview, result];
};

export default useDeleteReview;