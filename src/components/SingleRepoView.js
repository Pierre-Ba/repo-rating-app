
import React from "react";
import { Text } from 'react-native';
//import { useLocation } from "react-router-dom";

import RepositoryItem from "./RepositoryItem";


//import { GET_REPOSITORY } from "../graphql/queries";


const SingleRepoView = (props) => {
    
  const data  = props.history.location.state.state;
  console.log('DATA IN SINGLEREPOVIEW: ', data);
   
    
    return (
       
        <RepositoryItem item={data} />
        
    );
};

export default SingleRepoView;