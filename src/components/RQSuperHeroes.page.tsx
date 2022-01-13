import React, { useState } from 'react'
import { useAddSuperHero, useSuperHeroesData } from '@Hooks/useSuperHeroesData'
import { Link } from 'react-router-dom'

const onSuccess = (data) => {
  console.log('Perform side effect after data fetching', data)
}

const onError = (error) => {
  console.log('Perform side effect after encountering error', error)
}

const RQSuperHeroesPage: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [alterEgo, setAlterEgo] = useState<string>('')

  const { mutate: addHero } = useAddSuperHero()

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(onSuccess, onError)

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo }
    addHero(hero)
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error?.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={() => refetch()}>Fetch Heroes</button>
      {data!.map((hero) => {
        return (
          <div key={hero.name}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        )
      })}
    </>
  )
}

export default RQSuperHeroesPage
