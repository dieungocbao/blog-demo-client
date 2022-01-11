import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

interface Color {
  id: number
  color: string
}

const fetchColors = (pageNumber): Promise<Color[]> => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`).then((response) => response.data)
}

const PaginatedQueriesPage: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { isLoading, isError, error, data } = useQuery<Color[], Error>(['colors', pageNumber], () => fetchColors(pageNumber), {
    keepPreviousData: true
  })

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error?.message}</h2>
  }

  return (
    <>
      <h2>Dependent Queries Page</h2>
      <div>
        {data.map((color) => {
          return (
            <div key={color.id}>
              <h4>
                {color.id}. {color.color}
              </h4>
            </div>
          )
        })}
      </div>
      <div>
        <button onClick={() => setPageNumber((page) => page - 1)} disabled={pageNumber === 1}>
          Prev page
        </button>
        <button onClick={() => setPageNumber((page) => page + 1)} disabled={pageNumber === 4}>
          Next page
        </button>
      </div>
    </>
  )
}

export default PaginatedQueriesPage
