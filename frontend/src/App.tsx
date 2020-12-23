import React from 'react';
import { useQuery, gql } from '@apollo/client';

const ALL_NOTES = gql`
  query GetAllNotes {
    allNotes {
      title
      content
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(ALL_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allNotes.map((el: {title: string, content: string}, index: number) => (
      <div key={index}>
        <h1>{el.title}</h1>
        <p>
          {el.content}
        </p>
      </div>
  ));
}

export default App;
