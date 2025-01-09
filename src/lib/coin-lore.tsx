import { ApiCryptos, Cryptos } from '@/types/cryptos'

/**
 * Récupère toutes les cryptos
 * récupère 10 cryptos
 * @returns {Promise<Cryptos>}
 */
export async function getCryptos(): Promise<Array<Cryptos>> {
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/tickers/?start=1&limit=10`)
  const data: ApiCryptos = await res.json()
  return data.data
}
