import { useQuery, useMutation, useQueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { request } from '../utils/axios-utils'
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
  return request({ url: '/superheroes' }).then((response) => response.data)
}

const addSuperHero = (hero: InputHero): Promise<AxiosResponse> => {
  return request({ url: '/superheroes', method: 'post', data: hero })
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
    onSuccess: (data) => {
      // queryClient.invalidateQueries('super-heroes')
      queryClient.setQueryData('super-heroes', (oldQueryData: any) => {
        return [...oldQueryData, data.data]
      })
    }
  })
}
