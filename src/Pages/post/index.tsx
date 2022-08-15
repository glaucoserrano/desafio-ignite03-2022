import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../lib/axios'
import { IPost } from '../home'
import { PostContent } from './components/PostContent'
import { PostHeader } from './components/PostHeader'

const userName = import.meta.env.VITE_GITHUB_USERNAME
const repoName = import.meta.env.VITE_GITHUB_REPONAME

export function Post() {
  const [postData, setPostData] = useState({} as IPost)
  const [isLoading, setIsloading] = useState(true)
  const { id } = useParams()
  const getPostDetails = useCallback(async () => {
    try {
      setIsloading(true)

      const response = await api.get(
        `/repos/${userName}/${repoName}/issues/${id}`,
      )
      setPostData(response.data)
    } finally {
      setIsloading(false)
    }
  }, [id])
  useEffect(() => {
    getPostDetails()
  }, [getPostDetails])
  return (
    <>
      <PostHeader postData={postData} isLoading={isLoading} />
      {!isLoading && <PostContent content={postData.body} />}
    </>
  )
}
