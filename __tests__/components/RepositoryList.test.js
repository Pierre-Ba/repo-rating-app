/* eslint-disable jest/expect-expect */
/* eslint-disable no-unused-vars */
import React from 'react';
import RepositoryList from '../../src/components/RepositoryList';
import { FlatList } from 'react-native';
import RepositoryItem from '../../src/components/RepositoryItem';
import { ItemSeparator } from '../../src/components/RepositoryList';
import { render, componentTree } from '@testing-library/react-native';

const RepositoryListContainer = ({ repositories }) => {
    const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
    data={repositoryNodes}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({ item }) => <RepositoryItem  item={item} />}
    testID="repo1"
    
  />
  );
};

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };
  
        // Add your test code here
        const { debug, getByTestId, getByText } = render(<RepositoryListContainer repositories={repositories} />);
      

        debug();

        expect(getByTestId('repo1')).toHaveProp('data');
        expect(getByText('async-library/react-async')).toBeDefined();
        expect(getByText('jaredpalmer/formik')).toBeDefined();
        expect(repositories.edges.length).toBe(2);
        expect(repositories.edges[0].node.description).toBe('Build forms in React, without the tears');
        expect(repositories.edges[1].node.description).toBe('Flexible promise-based React data loader');
        expect(repositories.edges[0].node.language).toBe('TypeScript');
        expect(repositories.edges[1].node.language).toBe('JavaScript');
        expect(repositories.edges[0].node.forksCount).toBe(1619);
        expect(repositories.edges[1].node.forksCount).toBe(69);
        expect(repositories.edges[0].node.stargazersCount).toBe(21856);
        expect(repositories.edges[1].node.stargazersCount).toBe(1760);
        expect(repositories.edges[0].node.ratingAverage).toBe(88);
        expect(repositories.edges[1].node.ratingAverage).toBe(72);
        expect(repositories.edges[0].node.reviewCount).toBe(3);
        expect(repositories.edges[1].node.reviewCount).toBe(3);
      });
    });
  });