import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import '@Styles/styles.css'
import HomePage from '@Components/Home.page'
import RQSuperHeroesPage from '@Components/RQSuperHeroes.page'
import SuperHeroesPage from '@Components/SuperHeroes.page'
import RQSuperHeroPage from '@Components/RQSuperHero.page'
import ParallelQueriesPage from '@Components/ParallelQueries.page'
import DynamicParallelQueriesPage from '@Components/DynamicParallelQueries.page'
import DependentQueriesPage from '@Components/DependenctQueries.page'
import PaginatedQueriesPage from '@Components/PaginatedQueries.page'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-parallel">RQ Parallel Queries</Link>
              </li>
              <li>
                <Link to="/rq-dynamic-parallel">Dynamic Parallel Queries</Link>
              </li>
              <li>
                <Link to="/rq-dependent-queries">Dependent Queries</Link>
              </li>
              <li>
                <Link to="/rq-paginated-queries">Paginated Queries</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rq-dynamic-parallel" element={<DynamicParallelQueriesPage heroIds={[1, 3]} />} />
            <Route path="/rq-parallel" element={<ParallelQueriesPage />} />
            <Route path="/rq-super-heroes/:heroId" element={<RQSuperHeroPage />} />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/rq-dependent-queries" element={<DependentQueriesPage email="dieungocbao@gmail.com" />} />
            <Route path="/rq-paginated-queries" element={<PaginatedQueriesPage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  )
}

export default App
