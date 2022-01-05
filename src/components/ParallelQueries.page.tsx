import React from 'react'
import { useFriendsData } from '@Hooks/useParallelQueries'
import { useSuperHeroesData } from '@Hooks/useSuperHeroesData'

const ParallelQueriesPage: React.FC = () => {
  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching', data)
  }

  const onError = (error) => {
    console.log('Perform side effect after encountering error', error)
  }

  const { data: dataHeroes } = useSuperHeroesData(onSuccess, onError)

  const { isLoading, data: dataFriends, isError, error } = useFriendsData(onSuccess, onError)

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error?.message}</h2>
  }

  return (
    <>
      <h2>Parallel Queries Page</h2>
      <h4 style={{ marginTop: '0.8rem' }}>List friends:</h4>
      {dataFriends!.map((friend) => {
        return (
          <div key={friend.name}>
            <div>{friend.name}</div>
          </div>
        )
      })}
      <h4 style={{ marginTop: '0.8rem' }}>List heroes:</h4>
      {dataHeroes!.map((hero) => {
        return (
          <div key={hero.name}>
            <div>{hero.name}</div>
          </div>
        )
      })}
    </>
  )
}

export default ParallelQueriesPage
