import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

interface Hero {
  id: number
  name: string
  alterEgo: string
}

type Heroes = ReadonlyArray<Hero>

const fetchSuperHero = ({ queryKey }): Promise<Hero> => {
  const heroId = queryKey[1]
  return axios.get(`http://localhost:4000/superheroes/${heroId}`).then((response) => response.data)
}

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient()
  return useQuery<Hero, Error>(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient.getQueryData<Heroes>('super-heroes')?.find((hero) => hero.id === parseInt(heroId))
      return hero
    }
  })
}
