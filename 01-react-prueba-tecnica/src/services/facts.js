const CAT_FACT_API = 'https://catfact.ninja/fact'

export const getRandomFact = async () => {
  const res = await fetch(CAT_FACT_API)
  const data = await res.json()
  const { fact } = data
  return fact
}