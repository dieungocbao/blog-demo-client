import React from 'react'
import { useQueries } from 'react-query'
import axios from 'axios'

interface DynamicParallelQueriesPageProps {
  heroIds: number[]
}

interface IHero {
  id: number
  name: string
  alterEgo: string
}

const fetchSuperHero = (heroId): Promise<IHero> => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`).then((response) => response.data)
}

const DynamicParallelQueriesPage: React.FC<DynamicParallelQueriesPageProps> = ({ heroIds }) => {
  const queryResult = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id)
      }
    })
  )

  console.log(queryResult)
  return <div>Dynamic Parallel Queries Page</div>
}

export default DynamicParallelQueriesPage
