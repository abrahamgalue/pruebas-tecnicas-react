import { useState, useEffect } from 'react'

export function useCatImage({ randomFact }) {
  const [giphyGiff, setGiphyGiff] = useState('')

  useEffect(() => {
    if (!randomFact) return

    const firstWord = randomFact.split(' ')[0]
    const imageUrl = `https://cataas.com/cat/says/${firstWord}`
    setGiphyGiff(imageUrl)
  }, [randomFact])

  return { giphyGiff }
}
