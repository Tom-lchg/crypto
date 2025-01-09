import Deposit from '@/features/wallet/deposit'
import Withdraw from '@/features/wallet/withdraw'
import { UserContext } from '@/hook/user-context'
import React, { useContext, useState } from 'react'

export interface Transaction {
  id: number
  type: 'deposit' | 'withdrawal'
  amount: number
  currency: 'USD' | 'BTC' | 'ETH'
  address?: string
  date: string
}

interface Wallet {
  balance: { [key: string]: number }
  transactions: Transaction[]
}

const Wallet: React.FC = () => {
  const { user } = useContext(UserContext) || {}

  const [wallet, setWallet] = useState<Wallet>({
    balance: { USD: 0, BTC: 0, ETH: 0 },
    transactions: [],
  })

  const [currency, setCurrency] = useState<'USD' | 'BTC' | 'ETH'>('USD')
  const [address, setAddress] = useState('')

  const handleDeposit = (amount: number) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      type: 'deposit',
      amount,
      currency,
      date: new Date().toISOString(),
    }

    setWallet((prevWallet) => ({
      balance: {
        ...prevWallet.balance,
        [currency]: prevWallet.balance[currency] + amount,
      },
      transactions: [newTransaction, ...prevWallet.transactions],
    }))
  }

  const handleWithdraw = (amount: number) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      type: 'withdrawal',
      amount,
      currency,
      address,
      date: new Date().toISOString(),
    }

    setWallet((prevWallet) => ({
      balance: {
        ...prevWallet.balance,
        [currency]: prevWallet.balance[currency] - amount,
      },
      transactions: [newTransaction, ...prevWallet.transactions],
    }))

    setAddress('')
  }

  return (
    <main className='max-w-7xl mx-auto mt-14'>
      <section className='space-y-6'>
        <section className='flex gap-8 justify-between'>
          <article className='flex gap-4'>
            <div className='w-20 h-20 bg-red-500 rounded-md'></div>
            <h2 className='text-xl font-medium'>
              {user?.username ? user.username : 'user disconnected'}
            </h2>
          </article>
          <article>
            <h2 className='text-zinc-400'>UID</h2>
            <h2>275287</h2>
          </article>
          <article>
            <h2 className='text-zinc-400'>VIP Level</h2>
            <h2>Regular User</h2>
          </article>
          <article>
            <h2 className='text-zinc-400'>Following</h2>
            <h2>0</h2>
          </article>
          <article>
            <h2 className='text-zinc-400'>Followers</h2>
            <h2>0</h2>
          </article>
        </section>

        <article className='rounded-xl border p-6 space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-medium'>Estimated Balance</h2>
            <div className='space-x-3'>
              <Deposit handleDeposit={handleDeposit} setCurrency={setCurrency} />
              <Withdraw handleWithdraw={handleWithdraw} setCurrency={setCurrency} />
            </div>
          </div>

          <h2 className='text-4xl font-bold'>
            {wallet.balance.BTC} <span className='font-normal text-sm'>btc</span>
          </h2>
          <h2 className='font-medium text-zinc-400'>${wallet.balance.USD}</h2>
          <h2 className='font-medium text-zinc-400'>Today&apos;s PnL + $0.00(0.00%)</h2>
        </article>
      </section>
    </main>
  )
}

export default Wallet