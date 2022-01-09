import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

interface DependentQueriesPageProps {
  email: string
}

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`).then((response) => response.data)
}

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`).then((response) => response.data)
}

const DependentQueriesPage: React.FC<DependentQueriesPageProps> = ({ email }) => {
  const { data: user } = useQuery(['user', email], () => fetchUserByEmail(email))

  const channelId = user?.channelId
  const { data: courses } = useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId
  })
  console.log(courses)
  return <div>Dependent Queries Page</div>
}

export default DependentQueriesPage
