import { FC, JSX } from 'react'
import { Button, buttonVariants } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'

interface IDialogMsgProps {}

const DialogMsg: FC<IDialogMsgProps> = ({}): JSX.Element => {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ size: 'sm' })}>Nouveau message</DialogTrigger>
      <DialogContent>
        <DialogHeader className='space-y-3'>
          <DialogTitle>Que voulez-vous dire ?</DialogTitle>
          <Text placeholder='ok' />
          <Button>Envoyer</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DialogMsg
