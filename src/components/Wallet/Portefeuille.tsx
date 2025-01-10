import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Transaction {
  id: number;
  date: string;
  orderType: 'market' | 'limit';
  amount: number;
  price: number;
}

interface Wallet {
  balance: { [key: string]: number };
  transactions: Transaction[];
}

const fetchCryptoPrices = async () => {
  try {
    const response = await axios.get('https://api.coinlore.net/api/tickers/', {
      params: { limit: 100 },
    });
    return response.data.data.reduce((acc: { [key: string]: number }, crypto: any) => {
      acc[crypto.symbol] = parseFloat(crypto.price_usd);
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return {};
  }
};

const cryptoImages: { [key: string]: string } = {
  ETH: '/src/assets/eth.png',
  USDT: '/src/assets/usdt.png',
  XRP: '/src/assets/xrp.png',
  BNB: '/src/assets/bnb.png',
  SOL: '/src/assets/sol.png',
};

const Portefeuille: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet>({ balance: {}, transactions: [] });
  const [cryptoPrices, setCryptoPrices] = useState<{ [key: string]: number }>({});
  const [cryptos, setCryptos] = useState<string[]>([]);
  const [limitPrices, setLimitPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const loadPricesAndCryptos = async () => {
      try {
        const prices = await fetchCryptoPrices();
        setCryptoPrices(prices);

        const initialBalance: { [key: string]: number } = {};
        Object.keys(prices).forEach((symbol) => {
          initialBalance[symbol] = Math.random() * 10;
        });

        setWallet((prevWallet) => ({
          balance: { ...initialBalance, USD: 1000 },
          transactions: prevWallet.transactions,
        }));
        setCryptos(Object.keys(prices));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadPricesAndCryptos();
  }, []);

  const calculateTotalValue = () => {
    const cryptoValue = Object.entries(wallet.balance).reduce((total, [curr, qty]) => {
      if (curr === 'USD') return total;
      const price = cryptoPrices[curr] || 0;
      return total + qty * price;
    }, 0);
    return wallet.balance.USD + cryptoValue;
  };

  const handleBuyCrypto = (currency: string, orderType: 'market' | 'limit') => {
    if (!cryptoPrices[currency]) {
      alert('Crypto price not available.');
      return;
    }

    const usdAmount = 100;
    if (wallet.balance.USD < usdAmount) {
      alert('Insufficient USD balance.');
      return;
    }

    let price = cryptoPrices[currency];
    if (orderType === 'limit' && limitPrices[currency]) {
      price = limitPrices[currency]; // Use the user-specified price for limit orders
    }

    const cryptoAmount = usdAmount / price;
    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toISOString(),
      orderType,
      amount: cryptoAmount,
      price,
    };

    setWallet((prevWallet) => ({
      balance: {
        ...prevWallet.balance,
        USD: prevWallet.balance.USD - usdAmount,
        [currency]: (prevWallet.balance[currency] || 0) + cryptoAmount,
      },
      transactions: [newTransaction, ...prevWallet.transactions],
    }));
  };

  const handleLimitPriceChange = (currency: string, value: string) => {
    const price = parseFloat(value);
    if (!isNaN(price)) {
      setLimitPrices((prev) => ({
        ...prev,
        [currency]: price,
      }));
    }
  };

  if (!cryptoPrices || cryptos.length === 0) return <div>Loading...</div>;

  return (
    <main className="max-w-7xl mx-auto mt-24 space-y-6">
      <section className="rounded-xl border p-6">
        <h1 className="text-2xl font-bold">Portfolio Overview</h1>
        <h2 className="text-4xl font-bold mt-4">
          ${calculateTotalValue().toFixed(2)}
        </h2>
        <h3 className="font-medium text-zinc-400 mt-2">Total Balance (USD + Crypto)</h3>
      </section>

      <section className="rounded-xl border p-6 space-y-4">
        <h2 className="text-2xl font-medium">Balances</h2>
        <ul className="divide-y divide-zinc-200">
          {cryptos.map((cryptoSymbol) => (
            <li
              key={cryptoSymbol}
              className="flex justify-between items-center py-4"
            >
              <div className="flex items-center gap-4">
                {cryptoImages[cryptoSymbol] && (
                  <img
                    src={cryptoImages[cryptoSymbol]}
                    alt={cryptoSymbol}
                    className="w-8 h-8"
                  />
                )}
                <div>
                  <h3 className="font-medium text-lg">{cryptoSymbol}</h3>
                  <p className="text-sm text-zinc-500">
                    {wallet.balance[cryptoSymbol]?.toFixed(8) || 0} (
                    ${(wallet.balance[cryptoSymbol] * cryptoPrices[cryptoSymbol]).toFixed(2)}
                    )
                  </p>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleBuyCrypto(cryptoSymbol, 'market')}
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600"
                >
                  Buy (Market)
                </button>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Limit price"
                    onChange={(e) => handleLimitPriceChange(cryptoSymbol, e.target.value)}
                    className="px-3 py-1 border rounded-md"
                  />
                  <button
                    onClick={() => handleBuyCrypto(cryptoSymbol, 'limit')}
                    className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600"
                  >
                    Buy (Limit)
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border p-6 space-y-4">
        <h2 className="text-2xl font-medium">Transaction History</h2>
        {wallet.transactions.length === 0 ? (
          <p className="text-zinc-400">No transactions available.</p>
        ) : (
          <ul className="space-y-2">
            {wallet.transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <h3 className="font-medium">
                    {transaction.orderType === 'market' ? 'Market Buy' : 'Limit Buy'}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {new Date(transaction.date).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-600 text-sm">
                    Amount: {transaction.amount.toFixed(8)}
                  </p>
                  <p className="text-zinc-600 text-sm">
                    Price: ${transaction.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Portefeuille;
