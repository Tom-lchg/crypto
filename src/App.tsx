import { FC, JSX } from 'react'

const App: FC = (): JSX.Element => {
  return <h1 className='text-center text-4xl'>{import.meta.env.VITE_API_ENDPOINT}</h1>
}

export default App
