/* eslint-disable react-hooks/rules-of-hooks */

import Deposit from '@/features/wallet/deposit'
import Withdraw from '@/features/wallet/withdraw'
import { useFormatNumberCrypto } from '@/hook/use-convert-number'
import { UserContext } from '@/hook/user-context'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

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
  const { user, setUser } = useContext(UserContext) || {}

  const [, setWallet] = useState<Wallet>({
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

    setWallet((prevWallet) => {
      const updatedWallet = {
        balance: {
          ...prevWallet.balance,
          [currency]: prevWallet.balance[currency] + amount,
        },
        transactions: [newTransaction, ...prevWallet.transactions],
      }

      if (user) {
        const updatedUser = { ...user, wallet: updatedWallet }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        // @ts-expect-error - <type></type>
        setUser(updatedUser)
      }

      return updatedWallet
    })
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

  // on peut accéder à wallet uniquement si on est connecté
  const navigate = useNavigate()
  useEffect(() => {
    if (user === null || user === undefined) navigate('/login')
  }, [navigate, user])

  if (user === undefined || user === null) return <>login</>

  return (
    <main className='max-w-7xl mx-auto mt-24'>
      <section className='space-y-6'>
        <section className='flex gap-8 justify-between'>
          <article className='flex gap-4'>
            <img
              src={user.avatar}
              alt=''
              className='w-36 object-cover rounded-full h-36 border border-zinc-100'
            />
            <h2 className='text-xl font-medium'>{user.pseudo}</h2>
          </article>
          <article>
            <h2 className='text-zinc-400'>UID</h2>
            <h2>{user.id}</h2>
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
            {user.wallet.balance.BTC} <span className='font-normal text-sm'>btc</span>
          </h2>
          <h2 className='font-medium text-zinc-400'>
            ${useFormatNumberCrypto(String(user.wallet.balance.USD))}
          </h2>
          <h2 className='font-medium text-zinc-400'>Today&apos;s PnL + $0.00(0.00%)</h2>
        </article>
      </section>
    </main>
  )
}

export default Wallet
