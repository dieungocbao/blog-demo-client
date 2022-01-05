import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

interface IHero {
  id: number
  name: string
  alterEgo: string
}

const fetchSuperHeroes = (): Promise<IHero[]> => axios.get('http://localhost:4000/superheroes').then((response) => response.data)

const RQSuperHeroesPage: React.FC = () => {
  const { isLoading, data, isError, error } = useQuery<any[], Error>('super-heroes', fetchSuperHeroes, {
    select: data => data!.map(hero => hero.name)
  })

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error?.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {data!.map((heroName) => {
        return <div key={heroName}>{heroName}</div>
      })}
    </>
  )
}

export default RQSuperHeroesPage
