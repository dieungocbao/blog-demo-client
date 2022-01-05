import { useQuery } from 'react-query'
import axios from 'axios'

interface IFriend {
  id: number
  name: string
}

const fetchFriends = (): Promise<IFriend[]> => {
  return axios.get('http://localhost:4000/friends').then((response) => response.data)
}

export const useFriendsData = (onSuccess, onError) => {
  return useQuery<IFriend[], Error>('friends', fetchFriends, {
    onSuccess,
    onError
    // select: (data) => {
    //   const superHeroNames = data!.map((hero) => hero.name)
    //   return superHeroNames
    // }
  })
}
