import { buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { FC, useState } from 'react'

interface IDepositProps {
  handleDeposit: (amount: number) => void
  setCurrency: (currency: 'USD' | 'BTC' | 'ETH') => void
}

const Deposit: FC<IDepositProps> = ({ handleDeposit, setCurrency }): JSX.Element => {
  const [money, setMoney] = useState<number>(0)

  const setCur = (value: 'USD' | 'BTC' | 'ETH') => {
    setCurrency(value)
  }

  const depo = () => {
    handleDeposit(money)
    setMoney(0)
  }

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ size: 'sm' })}>Deposit</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-4'>Deposit</DialogTitle>
          <div className='space-y-3'>
            <Input
              placeholder='$10'
              onChange={(e) => setMoney(Number(e.target.value))}
              type='number'
            />
            <Select onValueChange={setCur}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='USD' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='USD'>USD</SelectItem>
                <SelectItem value='BTC'>BTC</SelectItem>
                <SelectItem value='ETH'>ETH</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DialogHeader>
        <DialogClose className={cn(buttonVariants(), 'w-full')} onClick={depo}>
          Deposit
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default Deposit
