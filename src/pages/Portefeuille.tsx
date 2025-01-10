import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Transaction {
  id: number
  date: string
  orderType: 'market' | 'limit'
  amount: number
  price: number
}

interface Wallet {
  balance: { [key: string]: number }
  transactions: Transaction[]
}

const fetchCryptoPrices = async () => {
  try {
    const response = await axios.get('https://api.coinlore.net/api/tickers/', {
      params: {
        limit: 100,
      },
    })

    return response.data.data.reduce((acc: { [key: string]: number }, crypto: any) => {
      acc[crypto.symbol] = parseFloat(crypto.price_usd)
      return acc
    }, {})
  } catch (error) {
    console.error('Error fetching crypto prices:', error)
    return {}
  }
}

const cryptoImages: { [key: string]: string } = {
  ETH: '/src/assets/eth.png',
  USDT: '/src/assets/usdt.png',
  XRP: '/src/assets/xrp.png',
  BNB: '/src/assets/bnb.png',
  SOL: '/src/assets/sol.png',
}

const Portefeuille: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet>({
    balance: {},
    transactions: [],
  })
  const [cryptoPrices, setCryptoPrices] = useState<{ [key: string]: number }>({})
  const [cryptos, setCryptos] = useState<any[]>([])

  useEffect(() => {
    const loadPricesAndCryptos = async () => {
      try {
        const prices = await fetchCryptoPrices()
        setCryptoPrices(prices)

        const initialBalance: { [key: string]: number } = {}
        Object.keys(prices).forEach((symbol) => {
          initialBalance[symbol] = Math.random() * 10
        })

        setWallet((prevWallet) => ({
          balance: {
            ...initialBalance,
            USD: 1000,
          },
          transactions: prevWallet.transactions,
        }))

        setCryptos(Object.keys(prices))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    loadPricesAndCryptos()
  }, [])

  const calculateTotalValue = () => {
    const cryptoValue = Object.entries(wallet.balance).reduce((total, [curr, qty]) => {
      if (curr === 'USD') return total
      const price = cryptoPrices[curr] || 0
      return total + qty * price
    }, 0)
    return wallet.balance.USD + cryptoValue
  }

  const handleBuyCrypto = (currency: string, orderType: 'market' | 'limit') => {
    if (!cryptoPrices[currency]) {
      alert('Crypto price not available.')
      return
    }

    const usdAmount = 100
    if (wallet.balance.USD < usdAmount) {
      alert('Insufficient USD balance.')
      return
    }

    const cryptoAmount = usdAmount / cryptoPrices[currency]
    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toISOString(),
      orderType,
      amount: cryptoAmount,
      price: cryptoPrices[currency],
    }

    setWallet((prevWallet) => ({
      balance: {
        ...prevWallet.balance,
        USD: prevWallet.balance.USD - usdAmount,
        [currency]: (prevWallet.balance[currency] || 0) + cryptoAmount,
      },
      transactions: [...prevWallet.transactions, newTransaction],
    }))
  }

  if (!cryptoPrices || cryptos.length === 0) return <div>Loading...</div>

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Virtual Wallet</h1>
      <h2>Balances:</h2>
      <ul>
        {cryptos.map((cryptoSymbol) => (
          <li
            key={cryptoSymbol}
            style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
          >
            {cryptoImages[cryptoSymbol] && (
              <img
                src={cryptoImages[cryptoSymbol]}
                alt={cryptoSymbol}
                style={{ width: '30px', height: '30px', marginRight: '10px' }}
              />
            )}
            {cryptoSymbol}: {wallet.balance[cryptoSymbol]?.toFixed(8) || 0}
            {cryptoPrices[cryptoSymbol] &&
              `($${(wallet.balance[cryptoSymbol] * cryptoPrices[cryptoSymbol]).toFixed(2)})`}
            {cryptoSymbol !== 'USD' && (
              <div>
                <button
                  style={{ marginLeft: '10px' }}
                  onClick={() => handleBuyCrypto(cryptoSymbol, 'market')}
                >
                  Buy {cryptoSymbol} (Market Order)
                </button>
                <button
                  style={{ marginLeft: '10px' }}
                  onClick={() => handleBuyCrypto(cryptoSymbol, 'limit')}
                >
                  Buy {cryptoSymbol} (Limit Order)
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <h3>Total Portfolio Value: ${calculateTotalValue().toFixed(2)}</h3>

      <h3>Transaction History</h3>
      <ul>
        {wallet.transactions.map((transaction) => (
          <li key={transaction.id}>
            Date: {new Date(transaction.date).toLocaleString()}, Type: {transaction.orderType},
            Amount: {transaction.amount.toFixed(8)}, Price: ${transaction.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Portefeuille
