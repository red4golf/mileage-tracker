import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mileage Tracker</h1>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App