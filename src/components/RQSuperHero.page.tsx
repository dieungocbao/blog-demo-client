import React from 'react'
import { useSuperHeroData } from '@Hooks/useSuperHeroData'
import { useParams } from 'react-router-dom'

const RQSuperHeroPage: React.FC = () => {
  const { heroId } = useParams()
  const { isLoading, data, isError, error } = useSuperHeroData(heroId)

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error?.message}</h2>
  }
  return (
    <>
      <h2>RQ Super Hero Page</h2>
      <div>
        {data.name} - {data.alterEgo}
      </div>
    </>
  )
}

export default RQSuperHeroPage
