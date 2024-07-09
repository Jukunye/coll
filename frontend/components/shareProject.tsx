import { useState } from 'react';
import { CopyIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

type ShareDialogProps = {
  projectId: string;
  onClose: () => void;
};

export function ShareDialog({ projectId, onClose }: ShareDialogProps) {
  const handleCopyClick = () => {
    const copyText = document.getElementById('link') as HTMLInputElement | null;
    if (copyText && copyText.value) {
      navigator.clipboard.writeText(copyText.value).then(
        () => {
          toast.success('Copied to clipboard');
          onClose();
        },
        (err) => {
          toast.error('Failed to copy!');
        }
      );
    }
  };

  return (
    <Dialog onOpenChange={(open) => !open && onClose()}>
      <DialogTrigger className="w-full text-left text-sm px-2 py-1.5">
        Share
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share project link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex border rounded-md items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <label htmlFor="link" className="sr-only">
              Link
            </label>
            <input
              className="pl-2 focus:outline-none"
              id="link"
              defaultValue={`http://localhost:3000/project/${projectId}`}
              readOnly
            />
          </div>
          <Button
            variant="secondary"
            type="button"
            size="sm"
            className="px-3"
            onClick={handleCopyClick}
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
