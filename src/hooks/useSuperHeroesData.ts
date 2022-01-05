import { useQuery } from 'react-query'
import axios from 'axios'

interface IHero {
  id: number
  name: string
  alterEgo: string
}

const fetchSuperHeroes = (): Promise<IHero[]> => axios.get('http://localhost:4000/superheroes').then((response) => response.data)

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery<any[], Error>('super-heroes', fetchSuperHeroes, {
    onSuccess,
    onError,
    select: (data) => {
      const superHeroNames = data!.map((hero) => hero.name)
      return superHeroNames
    }
  })
}
