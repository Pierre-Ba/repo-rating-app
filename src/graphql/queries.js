import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query repositories ($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories (orderDirection: $orderDirection,
      orderBy: $orderBy
      searchKeyword: $searchKeyword) {
      edges {
        node {
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          id
        }
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql `
query repository($id: ID!){
  repository(id: $id) {
    id
    fullName
    url
    forksCount
    language
    ownerAvatarUrl
    ratingAverage
    reviewCount
    stargazersCount
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;

export const GET_REVIEWS = gql `
query repository($id: ID!) {
  repository(id: $id) {
    id
    fullName
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;


/*
Query variables to sort the repositories query:

query repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy ) {
repositories(orderDirection: $orderDirection,
             orderBy: $orderBy) {
  edges {
    node {
    ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          id
          reviews {
      edges {
        node {
          rating
          createdAt
          
        }
      }
    }
}
}
}

}

/////////////////////////////
Lowest Rated Repos
{
  "orderDirection": "ASC",
  "orderBy": "RATING_AVERAGE"
}
/////////////////////////////

/////////////////////////////
Highest Rated Repos

{
  "orderDirection": "DESC",
  "orderBy": "RATING_AVERAGE"
}
/////////////////////////////

/////////////////////////////
Latest Repos
{
  "orderDirection": "DESC",
  "orderBy": "CREATED_AT"
}
/////////////////////////////

*/