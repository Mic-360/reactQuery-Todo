import { useQuery } from '@tanstack/react-query';
import './App.css';

function App() {
  const url = 'http://localhost:3000/api/languages';

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
      
    </div>
  );
}

export default App;
