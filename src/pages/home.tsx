/* eslint-disable react-hooks/rules-of-hooks */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useFormatNumber } from '@/hook/use-convert-number'
import { useIsNegative } from '@/hook/use-is-negative'
import { getCryptos } from '@/lib/coin-lore'
import { Cryptos } from '@/types/cryptos'
import { GitPullRequestCreate, Info } from 'lucide-react'
import { FC, JSX, useEffect, useState } from 'react'
import { Link } from 'react-router'

const Home: FC = (): JSX.Element => {
  const [cryptos, setCryptos] = useState<Array<Cryptos>>()

  useEffect(() => {
    async function fetchCryptos() {
      const response = await getCryptos()
      if (response === undefined) return []
      setCryptos(response)
    }
    fetchCryptos()
  }, [])

  console.log(cryptos)

  // dans le cas ou le fetch prend du temps
  if (!cryptos) return <div>Loading...</div>

  return (
    <main className='max-w-7xl mx-auto mt-14'>
      <Table>
        <TableHeader>
          <TableRow className='text-xs'>
            <TableHead className='w-[200px]'>Name</TableHead>
            <TableHead className='text-right'>Price</TableHead>
            <TableHead className='text-right'>Change</TableHead>
            <TableHead className='text-right'>24h Volume</TableHead>
            <TableHead className='text-right'>Market Cap</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='py-6'>
          {cryptos.map((crypto, key) => (
            <TableRow key={key} className='text-right'>
              <TableCell className='font-medium space-x-2 text-start'>
                <span className='font-medium'>{crypto.symbol}</span>
                <span className='text-zinc-500 text-xs'>{crypto.name}</span>
              </TableCell>
              <TableCell>${crypto.price_usd}</TableCell>
              <TableCell
                className={
                  useIsNegative(crypto.percent_change_24h) ? 'text-destructive' : 'text-green-400'
                }
              >
                {crypto.percent_change_24h}%
              </TableCell>
              <TableCell>${useFormatNumber(crypto.volume24)}</TableCell>
              <TableCell>{useFormatNumber(Number(crypto.market_cap_usd))}</TableCell>
              <TableCell className='space-x-3'>
                <TooltipProvider>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger>
                      <Link to={`/details/${crypto.nameid}`}>
                        <Info size={20} />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger>
                      <Link to={`/traide/${crypto.nameid}`}>
                        <GitPullRequestCreate size={20} />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Traide</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}

export default Home
