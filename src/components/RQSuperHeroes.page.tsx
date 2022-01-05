import React from 'react'
import { useSuperHeroesData } from '@Hooks/useSuperHeroesData'

const RQSuperHeroesPage: React.FC = () => {
  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching', data)
  }

  const onError = (error) => {
    console.log('Perform side effect after encountering error', error)
  }

  const { isLoading, data, isError, error } = useSuperHeroesData(onSuccess, onError)

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
