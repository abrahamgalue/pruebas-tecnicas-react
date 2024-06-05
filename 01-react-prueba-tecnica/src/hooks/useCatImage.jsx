import { useState, useEffect } from 'react'
import { formatURL } from '../utils/formatter'
import { API_KEY, LIMITS_OF_RESULTS } from '../utils/constants'

export function useCatImage({ randomFact }) {
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
