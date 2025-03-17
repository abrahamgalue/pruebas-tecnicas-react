import { useState, useEffect } from 'react'

export function useCatImage({ randomFact }) {
  const [giphyGiff, setGiphyGiff] = useState('')

  useEffect(() => {
    if (randomFact.length === 0) return

    let ignore = false

    async function getRandomImage() {
      const firstWord = randomFact.split(' ')[0]
      const imageUrl = `https://cataas.com/cat/says/${firstWord}`

      if (!ignore) {
        setGiphyGiff(imageUrl)
      }
    }

    getRandomImage()

    return () => {
      ignore = true
    }
  }, [randomFact])

  return { giphyGiff }
}
