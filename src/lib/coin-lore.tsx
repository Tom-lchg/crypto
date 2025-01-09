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

/**
 *  Envoie les informations pour le graph
 */

export async function getCrypto(id: number): Promise<Array<Crypto>> {
  const res = await fetch(`https://api.coinlore.net/api/tickers/?id=${id}`);
  return await res.json();
}

