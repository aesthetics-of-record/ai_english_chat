import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface ChatDialogProps {
  children: React.ReactNode;
  chat: any;
}

const ChatDialog: React.FC<ChatDialogProps> = ({ children, chat }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>AI-ANALYZES</DialogTitle>
          <DialogDescription>AI analyzes of your chats</DialogDescription>
        </DialogHeader>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>Title</TableHead>
                <TableHead className='text-right'>Content</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className='font-medium'>잘못된문장</TableCell>
                <TableCell>{chat.wrong_sentence}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>올바른문장</TableCell>
                <TableCell>{chat.right_sentence}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>고급문장</TableCell>
                <TableCell>{chat.enhanced_sentence}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>코멘트</TableCell>
                <TableCell>{chat.comment}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
