import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import '@Styles/styles.css'
import HomePage from '@Components/Home.page'
import RQSuperHeroesPage from '@Components/RQSuperHeroes.page'
import SuperHeroesPage from '@Components/SuperHeroes.page'

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
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
