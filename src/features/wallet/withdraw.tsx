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
import { FC, JSX, useState } from 'react'

interface IWhitdrawProps {
  handleWithdraw: (amount: number) => void
  setCurrency: (currency: 'USD' | 'BTC' | 'ETH') => void
}

const Withdraw: FC<IWhitdrawProps> = ({ handleWithdraw, setCurrency }): JSX.Element => {
  const [money, setMoney] = useState<number>(0)

  const setCur = (value: 'USD' | 'BTC' | 'ETH') => {
    setCurrency(value)
  }

  const withd = () => {
    handleWithdraw(money)
    setMoney(0)
  }

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ size: 'sm' })}>Withdraw</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-4'>Whitdraw</DialogTitle>
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
            <Input placeholder='Address' onChange={(e) => setMoney(Number(e.target.value))} />
          </div>
        </DialogHeader>

        <DialogClose className={cn(buttonVariants(), 'w-full')} onClick={withd}>
          Withdraw
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default Withdraw
