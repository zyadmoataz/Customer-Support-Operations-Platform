import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes cache validity
      refetchOnWindowFocus: false, // don't refetch when window regains focus
      retry: 1, // retry once if the request fails
    },
  },
})
