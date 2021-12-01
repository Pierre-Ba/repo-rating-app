import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";


const useCreateReview = () => {
    

    const [create, result] = useMutation(CREATE_REVIEW, {
        onError:(error) => {
            console.log('ERROR DURING CREATE REVIEW MUTATION: ', error.graphQLErrors[0].message);
        }
    });
    const createReview = async ({repositoryName, ownerName, rating, text }) => {
        const { data } = await create({
            variables: {
                review: { 
                    repositoryName,
                    ownerName,
                    rating: Number(rating),
                    text
                }
                }
            });
         
            return { data };
    };
    return [createReview, result];
};

export default useCreateReview;