import { useQuery } from 'react-query'
import axios from 'axios'

interface IHero {
  id: number
  name: string
  alterEgo: string
}

const fetchSuperHero = ({ queryKey }): Promise<IHero> => {
  const heroId = queryKey[1]
  return axios.get(`http://localhost:4000/superheroes/${heroId}`).then((response) => response.data)
}

export const useSuperHeroData = (heroId) => {
  return useQuery<IHero, Error>(['super-hero', heroId], fetchSuperHero)
}
