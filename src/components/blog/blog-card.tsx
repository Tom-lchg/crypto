import { FC, JSX } from 'react'

interface IBlogCardProps {
  user: {
    avatar: string
    pseudo: string
  }
  message: string
}

const BlogCard: FC<IBlogCardProps> = ({ message, user }): JSX.Element => {
  return <div className='border px-8 py-4 rounded-xl'>Hello</div>
}

export default BlogCard
