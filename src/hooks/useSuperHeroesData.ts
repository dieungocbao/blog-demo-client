import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios, { AxiosResponse } from 'axios'

interface IHero {
  id: number
  name: string
  alterEgo: string
}

interface InputHero {
  name: string
  alterEgo: string
}

const fetchSuperHeroes = (): Promise<IHero[]> => {
  return axios.get('http://localhost:4000/superheroes').then((response) => response.data)
}

const addSuperHero = (hero: InputHero): Promise<AxiosResponse> => {
  return axios.post('http://localhost:4000/superheroes', hero)
}

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery<IHero[], Error>('super-heroes', fetchSuperHeroes, {
    onSuccess,
    onError
    // select: (data) => {
    //   const superHeroNames = data!.map((hero) => hero.name)
    //   return superHeroNames
    // }
  })
}

export const useAddSuperHero = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    onSuccess: () => {
      queryClient.invalidateQueries('super-heroes')
    }
  })
}
