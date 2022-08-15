import { useCallback, useEffect, useState } from 'react'
import { Spinner } from '../../components/Spinner'
import { api } from '../../lib/axios'
import { Post } from './components/Post'
import { Profile } from './components/Profile'
import { SearchInput } from './components/SearchInput'
import { PostListContainer } from './styles'

export interface IPost {
  title: string
  body: string
  created_at: string
  number: number
  html_url: string
  comments: number
  user: {
    login: string
  }
}
const userName = import.meta.env.VITE_GITHUB_USERNAME
const repoName = import.meta.env.VITE_GITHUB_REPONAME
export function Home() {
  const [posts, setPosts] = useState<IPost[]>([])
  const [isLoading, setIsloading] = useState(true)

  const getPosts = useCallback(async (query: string = '') => {
    try {
      setIsloading(true)
      const response = await api.get(
        `/search/issues?q=${query}%20repo:${userName}/${repoName}`,
      )
      setPosts(response.data.items)
    } finally {
      setIsloading(false)
    }
  }, [])
  useEffect(() => {
    getPosts()
  }, [getPosts])
  return (
    <>
      <Profile />
      <SearchInput getPosts={getPosts} postLength={posts.length} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <PostListContainer>
            {posts.map((post) => (
              <Post key={post.number} post={post} />
            ))}
          </PostListContainer>
        </>
      )}
    </>
  )
}
