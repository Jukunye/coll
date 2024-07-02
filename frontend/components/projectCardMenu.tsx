'use client';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { ElipsisIcon } from './icons';
import { useAuth } from '@/app/provider';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import axios from 'axios';
import { toast } from 'sonner';

type DeleteProjectProps = {
  title: string;
  projectId: string;
  onClose: () => void;
};

function DeleteProject({ projectId, title, onClose }: DeleteProjectProps) {
  const { token } = useAuth();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/project/${projectId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Successfully Deleted!');
      onClose();
    } catch (error) {
      toast.error('Failed to Delete');
      console.error('Error occurred deleting project:', error);
    }
  };

  return (
    <Dialog onOpenChange={(open) => !open && onClose()}>
      <DialogTrigger className="w-full">Delete</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Project Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &#39;{title}&#39;
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type ProjectCardMenuProps = {
  projectId: string;
  ownerId: string;
  title: string;
};

function ProjectCardMenu({ projectId, title, ownerId }: ProjectCardMenuProps) {
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setIsOwner(user?._id === ownerId);
    }
  }, [user, ownerId]);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDropdownOpen(false);
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <Button variant="ghost" size="sm">
          <ElipsisIcon className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <button className="w-full">View</button>
        </DropdownMenuItem>
        {isOwner && (
          <>
            <DropdownMenuItem>
              <button className="w-full">Edit</button>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteProject
                title={title}
                projectId={projectId}
                onClose={handleDialogClose}
              />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProjectCardMenu;
