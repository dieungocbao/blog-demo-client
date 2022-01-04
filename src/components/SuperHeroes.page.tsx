import React, { useState, useEffect } from 'react'

import axios from 'axios'

interface IHero {
  id: number
  name: string
  alterEgo: string
}

const SuperHeroesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<IHero[]>([])

  useEffect(() => {
    axios.get('http://localhost:4000/superheroes').then((res) => {
      setData(res.data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>
      })}
    </>
  )
}

export default SuperHeroesPage
