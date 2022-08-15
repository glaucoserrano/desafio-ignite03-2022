import { SearchInputContainer } from './styles'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const searchFormSchema = z.object({
  query: z.string(),
})
type SearchFormInput = z.infer<typeof searchFormSchema>

interface SearchInputProps {
  getPosts: (query?: string) => Promise<void>
  postLength: number
}

export function SearchInput({ getPosts, postLength }: SearchInputProps) {
  const { register, handleSubmit } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchPost(data: SearchFormInput) {
    await getPosts(data.query)
  }
  return (
    <SearchInputContainer onSubmit={handleSubmit(handleSearchPost)}>
      <header>
        <h3>Publicações</h3>
        <span>{postLength} publicações</span>
      </header>
      <input type="text" placeholder="Buscar Conteúdo" {...register('query')} />
    </SearchInputContainer>
  )
}
