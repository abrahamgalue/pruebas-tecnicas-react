import './App.css'
import { useState, useEffect } from 'react'
import { getRandomFact } from './services/facts'

const API_KEY = import.meta.env.VITE_API_KEY
const LIMITS_OF_RESULTS = '1'

const formatURL = str => {
  return str.split(' ', 3).join('+')
}

function useCatImage({ randomFact }) {
  const [giphyGiff, setGiphyGiff] = useState('')

  useEffect(() => {
    if (!randomFact) return

    fetch(
      `https://api.giphy.com/v1/gifs/search?q=${formatURL(
        randomFact
      )}&api_key=${API_KEY}&limit=${LIMITS_OF_RESULTS}`
    )
      .then(res => res.json())
      .then(results => setGiphyGiff(results?.data[0]?.images.original.url))
  }, [randomFact])

  return { giphyGiff }
}

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
        <img src={giphyGiff} alt={randomFact} />
        <p>{randomFact}</p>
        <button onClick={handleClick}>New fact</button>
      </div>
    </>
  )
}
