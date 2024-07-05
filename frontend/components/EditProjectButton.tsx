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
import ProtectRoute from '@/app/protectRoute';
import EditProject from './forms/EditProject';

function EditProjectButton() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mb-4">
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425]">
        <ProtectRoute>
          <DialogHeader>
            <DialogTitle>Edit your project</DialogTitle>
            <DialogDescription>Update your project details.</DialogDescription>
          </DialogHeader>
          <EditProject closeDialog={setOpen} />
        </ProtectRoute>
      </DialogContent>
    </Dialog>
  );
}

export default EditProjectButton;
