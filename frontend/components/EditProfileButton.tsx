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
import EditProfle from './forms/EditProfile';

function EditProfileButton() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mb-4">
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425]">
        <ProtectRoute>
          <DialogHeader>
            <DialogTitle>Edit your profile</DialogTitle>
            <DialogDescription>
              Update you profile information
            </DialogDescription>
          </DialogHeader>
          <EditProfle closeDialog={setOpen} />
        </ProtectRoute>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileButton;
