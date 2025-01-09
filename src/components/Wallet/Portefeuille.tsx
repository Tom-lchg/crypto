import React, { useState, useEffect } from 'react';

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
 
  return {
    ETH: 1600,
    USDT: 1,
    XRP: 0.5,
    BNB: 300,
    SOL: 20,
  };
};

const cryptoImages: { [key: string]: string } = {
  ETH: '/src/assets/eth.png',
  USDT: '/src/assets/usdt.png',
  XRP: '/src/assets/xrp.png',
  BNB: '/src/assets/bnb.png',
  SOL: '/src/assets/sol.png',
};

const Portefeuille: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet>({
    balance: { USD: 1000, ETH: 1.2, USDT: 500, XRP: 2000, BNB: 3, SOL: 10 },
    transactions: [
      {
        id: 1,
        date: new Date().toISOString(),
        orderType: 'market',
        amount: 1.5,
        price: 1600,
      },
      {
        id: 2,
        date: new Date().toISOString(),
        orderType: 'limit',
        amount: 2,
        price: 300,
      },
    ],
  });
  const [cryptoPrices, setCryptoPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const loadPrices = async () => {
      const prices = await fetchCryptoPrices();
      setCryptoPrices(prices);
    };
    loadPrices();
  }, []);

  const calculateTotalValue = () => {
    const cryptoValue = Object.entries(wallet.balance).reduce((total, [curr, qty]) => {
      if (curr === 'USD') return total;
      const price = cryptoPrices[curr] || 0;
      return total + qty * price;
    }, 0);
    return wallet.balance.USD + cryptoValue;
  };

  const handleBuyCrypto = (currency: string) => {
    if (!cryptoPrices[currency]) {
      alert('Crypto price not available.');
      return;
    }

    const usdAmount = 100; 
    if (wallet.balance.USD < usdAmount) {
      alert('Insufficient USD balance.');
      return;
    }

    const cryptoAmount = usdAmount / cryptoPrices[currency];

    setWallet((prevWallet) => ({
      balance: {
        ...prevWallet.balance,
        USD: prevWallet.balance.USD - usdAmount,
        [currency]: (prevWallet.balance[currency] || 0) + cryptoAmount,
      },
      transactions: [
        ...prevWallet.transactions,
        {
          id: Date.now(),
          date: new Date().toISOString(),
          orderType: 'market',
          amount: cryptoAmount,
          price: cryptoPrices[currency],
        },
      ],
    }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Virtual Wallet</h1>
      <h2>Balances:</h2>
      <ul>
        {Object.entries(wallet.balance).map(([curr, bal]) => (
          <li key={curr} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            {cryptoImages[curr] && <img src={cryptoImages[curr]} alt={curr} style={{ width: '30px', height: '30px', marginRight: '10px' }} />}
            {curr}: {bal.toFixed(8)} {curr !== 'USD' && cryptoPrices[curr] ? `($${(bal * cryptoPrices[curr]).toFixed(2)})` : ''}
            {curr !== 'USD' && (
              <button style={{ marginLeft: '10px' }} onClick={() => handleBuyCrypto(curr)}>
                Buy {curr}
              </button>
            )}
          </li>
        ))}
      </ul>
      <h3>Total Portfolio Value: ${calculateTotalValue().toFixed(2)}</h3>

      <h3>Transaction History</h3>
      <ul>
        {wallet.transactions.map((transaction) => (
          <li key={transaction.id}>
            Date: {new Date(transaction.date).toLocaleString()}, Type: {transaction.orderType}, Amount: {transaction.amount.toFixed(8)}, Price: ${transaction.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portefeuille;
