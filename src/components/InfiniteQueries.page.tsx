import React, { Fragment } from 'react'
import axios from 'axios'
import { useInfiniteQuery } from 'react-query'

interface Color {
  id: number
  color: string
}

const fetchColors = ({ pageParam = 1 }): Promise<Color[]> => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`).then((response) => response.data)
}

const InfiniteQueriesPage: React.FC = () => {
  const { isLoading, isError, error, data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery<Color[], Error>(
    ['colors'],
    fetchColors,
    {
      keepPreviousData: true,
      getNextPageParam: (_, pages) => {
        if (pages.length >= 4) {
          return undefined
        }
        return pages.length + 1
      }
    }
  )

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
        {data.pages.map((group, idx) => {
          return (
            <Fragment key={idx}>
              {group.map((color) => {
                return (
                  <div key={color.id}>
                    <h4>
                      {color.id}. {color.color}
                    </h4>
                  </div>
                )
              })}
            </Fragment>
          )
        })}
      </div>
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}

export default InfiniteQueriesPage
