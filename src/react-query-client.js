import { QueryClient } from '@tanstack/react-query';

const Client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default Client;
