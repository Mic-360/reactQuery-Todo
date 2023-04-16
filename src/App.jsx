import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Client from './react-query-client';
import './App.css';

const fetcher = (url, data) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

function App() {
  const url = 'http://localhost:3000/api/languages';

  const [addLanguage, setAddLanguage] = useState('');

  const {
    data: languages,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['languages'],
    queryFn: async () => {
      const res = await fetch(url);
      return await res.json();
    },
    select: (data) => data.language,
  });

  const mutation = useMutation({
    mutationFn: (data) => fetcher('http://localhost:3000/api/create', data),
    onSuccess: (data) => {
      setAddLanguage('');
      Client.invalidateQueries('languages');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error on Request</div>;
  }

  return (
    <div className='App'>
      <h1>To do App</h1>
      <strong>Programming languages</strong>

      {languages.map((language, index) => {
        return (
          <p key={index}>
            <strong>{index + 1}</strong>.&nbsp;{language}
          </p>
        );
      })}

      <div className='task'>
        <strong>Add a new language</strong>
        <input
          type='text'
          value={addLanguage}
          onChange={(e) => setAddLanguage(e.target.value)}
        />
        <button
          onClick={() => {
            mutation.mutate({ record: addLanguage });
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
