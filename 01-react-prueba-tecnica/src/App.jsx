import './App.css'
import { useState, useEffect } from 'react'
import { getRandomFact } from './services/facts'
import { useCatImage } from './hooks/useCatImage'

export default function App() {
  const [randomFact, setRandomFact] = useState('')
  const { giphyGiff } = useCatImage({ randomFact })

  const handleClick = () => {
    getRandomFact().then(fact => setRandomFact(fact))
  }

  useEffect(() => {
    getRandomFact().then(fact => setRandomFact(fact))
  }, [])

  return (
    <>
      <div className='container'>
        <img src={giphyGiff} alt={randomFact} width={300} height={300} />
        <p>{randomFact}</p>
        <button onClick={handleClick}>New fact</button>
      </div>
    </>
  )
}
