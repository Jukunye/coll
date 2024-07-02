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

type ProjectCardMenuProps = {
  projectId: string;
  ownerId: string;
  title: string;
};

function ProjectCardMenu({ projectId, title, ownerId }: ProjectCardMenuProps) {
  const [isOwner, setOwner] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setOwner(user?._id === ownerId);
    }
  }, [user, ownerId]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Button variant="ghost" size="sm">
          <ElipsisIcon className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>View</DropdownMenuItem>
        {isOwner && (
          <>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProjectCardMenu;
