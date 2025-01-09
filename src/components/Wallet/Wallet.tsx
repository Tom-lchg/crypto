import React, { useState, useEffect } from 'react';

interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal';
  amount: number;
  currency: 'ETH' | 'USDT' | 'XRP' | 'BNB' | 'SOL';
  address?: string;
  date: string;
}

interface Wallet {
  balance: { [key: string]: number };
  transactions: Transaction[];
}

const WalletApp: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet>({
    balance: { ETH: 0, USDT: 0, XRP: 0, BNB: 0, SOL: 0 },
    transactions: [],
  });
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<'ETH' | 'USDT' | 'XRP' | 'BNB' | 'SOL'>('ETH');
  const [address, setAddress] = useState('');

 
  useEffect(() => {
    const storedWallet = localStorage.getItem('wallet');
    if (storedWallet) {
      setWallet(JSON.parse(storedWallet));
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem('wallet', JSON.stringify(wallet));
  }, [wallet]);

  const handleDeposit = () => {
    if (amount <= 0) {
      alert('Enter a valid amount to deposit.');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      type: 'deposit',
      amount,
      currency,
      date: new Date().toISOString(),
    };

    setWallet((prevWallet) => ({
      balance: {
        ...prevWallet.balance,
        [currency]: prevWallet.balance[currency] + amount,
      },
      transactions: [newTransaction, ...prevWallet.transactions],
    }));

    setAmount(0);
    alert('Deposit successful!');
  };

  const handleWithdraw = () => {
    if (amount <= 0 || amount > wallet.balance[currency]) {
      alert('Enter a valid amount to withdraw.');
      return;
    }

    if (!address) {
      alert('Enter a valid address to withdraw to.');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      type: 'withdrawal',
      amount,
      currency,
      address,
      date: new Date().toISOString(),
    };

    setWallet((prevWallet) => ({
      balance: {
        ...prevWallet.balance,
        [currency]: prevWallet.balance[currency] - amount,
      },
      transactions: [newTransaction, ...prevWallet.transactions],
    }));

    setAmount(0);
    setAddress('');
    alert('Withdrawal successful!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Virtual Wallet</h1>
      <h2>Balances:</h2>
      <ul>
        {Object.entries(wallet.balance).map(([curr, bal]) => (
          <li key={curr}>
            {curr}: {bal.toFixed(8)}
          </li>
        ))}
      </ul>

      <div style={{ marginBottom: '20px' }}>
        <h3>Deposit</h3>
        <input
          type="number"
          step="0.00000001"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder={`Amount in ${currency}`}
        />
        <select value={currency} onChange={(e) => setCurrency(e.target.value as 'ETH' | 'USDT' | 'XRP' | 'BNB' | 'SOL')}>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
          <option value="XRP">XRP</option>
          <option value="BNB">BNB</option>
          <option value="SOL">SOL</option>
        </select>
        <button onClick={handleDeposit}>Deposit</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Withdraw</h3>
        <input
          type="number"
          step="0.00000001"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder={`Amount in ${currency}`}
        />
        <select value={currency} onChange={(e) => setCurrency(e.target.value as 'ETH' | 'USDT' | 'XRP' | 'BNB' | 'SOL')}>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
          <option value="XRP">XRP</option>
          <option value="BNB">BNB</option>
          <option value="SOL">SOL</option>
        </select>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Destination Address"
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>

      <h3>Transaction History</h3>
      <ul>
        {wallet.transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'} of {transaction.amount} {transaction.currency} on {new Date(transaction.date).toLocaleString()}
            {transaction.address && ` to ${transaction.address}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletApp;
