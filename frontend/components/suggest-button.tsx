import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import SuggetForm from './forms/suggest-project';

function SuggestButton() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Suggest</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425]">
        <DialogHeader>
          <DialogTitle>Suggest a project</DialogTitle>
          <DialogDescription>
            Fill out information about a project you would like to work on.
          </DialogDescription>
        </DialogHeader>
        <SuggetForm closeDialog={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default SuggestButton;
