import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String,
    $first: Int,
    $after: String
  ) {
    repositories(orderDirection: $orderDirection, 
      orderBy: $orderBy, 
      searchKeyword: $searchKeyword,
      first: $first,
      after: $after) {
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
        cursor
      }
      pageInfo {
      endCursor
      startCursor
      hasNextPage
      }
    }
  }
`;

export const FILTER_REPOSITORIES = gql`
  query repositories($searchKeyword: String) {
    repositories(searchKeyword: $searchKeyword) {
      edges {
        node {
          fullName
          id
        }
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false){
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            userId
            text
            repository {
              name
            }
            createdAt
            rating
          }
          cursor
        }
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

export const AUTHORIZED_USER_REVIEWS = gql`
query getAuthorizedUser($includeReviews: Boolean = true){
  authorizedUser {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          repository {
            name
            id
          }
          userId
          rating
          text
          createdAt
         
        }
        cursor
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
}
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
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
          cursor
        }
        pageInfo {
        endCursor
        startCursor
        hasNextPage
        }
      }
    }
  }
`;

export const GET_REVIEWS = gql`
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
