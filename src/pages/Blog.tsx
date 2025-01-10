import { getCrypto } from '@/lib/coin-lore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

interface Post {
  id: string
  title: string
  content: string
  date: string
  likes: number
}

const Blog: React.FC = () => {
  const { id: cryptoId } = useParams<{ id: string }>()
  const [posts, setPosts] = useState<Post[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')

  const [crypto, setCrypto] = useState<Crypto | null>(null)

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts')
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts))
    }
  }, [])

  useEffect(() => {
    async function getCryptoById(id: number) {
      const crypto = await getCrypto(Number(id))
      setCrypto(crypto)
    }

    if (cryptoId !== undefined) {
      getCryptoById(Number(cryptoId))
    }
  }, [cryptoId])

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts))
  }, [posts])

  const handlePost = () => {
    if (newTitle.trim() && newContent.trim()) {
      const newPost: Post = {
        id: `${Date.now()}`,
        title: newTitle,
        content: newContent,
        date: new Date().toISOString(),
        likes: 0,
      }
      setPosts([newPost, ...posts])
      setNewTitle('')
      setNewContent('')
    }
  }

  const handleDelete = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId))
  }

  const handleLike = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  const handleEdit = (postId: string, newTitle: string, newContent: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, title: newTitle, content: newContent } : post
      )
    )
  }

  console.log(crypto)

  if (!crypto) return <div>Loading...</div>

  return (
    <section className='max-w-7xl mt-24 mx-auto'>
      <h2 className='text-5xl font-medium'>{crypto.name} Blog</h2>
    </section>
  )
}

export default Blog
