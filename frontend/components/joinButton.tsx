import React, { useState, useEffect } from 'react';
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
import { Button } from './ui/button';
import ProtectRoute from '@/app/protectRoute';
import { useAuth } from '@/app/provider';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { Person } from '@/types';

type JoinButtonProps = {
  title: string;
  projectId: string;
  members: Person[];
  onUpdateMembers: (updatedMembers: Person[]) => void; // Callback to update members in parent
};

function JoinButton({
  title,
  projectId,
  members: initialMembers,
  onUpdateMembers,
}: JoinButtonProps) {
  const { user, token } = useAuth();
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState<Person[]>(initialMembers);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    if (user) {
      setHasJoined(members.some((member) => member._id === user._id));
    }
  }, [members, user]);

  const handleAction = async (action: 'join' | 'unjoin') => {
    try {
      const endpoint =
        action === 'join'
          ? `http://localhost:3001/project/${projectId}/add-member/${user?._id}`
          : `http://localhost:3001/project/${projectId}/remove-member/${user?._id}`;

      await axios.patch(
        endpoint,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast(`Successfully ${action === 'join' ? 'Joined' : 'UnJoined'}!`);

      if (action === 'join') {
        const updatedMembers = [...members, user];
        setMembers(updatedMembers);
        onUpdateMembers(updatedMembers); // Notify parent about updated members
      } else {
        const updatedMembers = members.filter(
          (member) => member._id !== user?._id
        );
        setMembers(updatedMembers);
        onUpdateMembers(updatedMembers); // Notify parent about updated members
      }

      setOpen(false);
    } catch (error) {
      toast(`Failed to ${action === 'join' ? 'Join' : 'UnJoin'}!`);
      console.error(
        `Error occurred while ${action === 'join' ? 'joining' : 'unjoining'}: `,
        error
      );
    }
  };

  const dialogTitle = hasJoined
    ? 'Would you like to UnJoin?'
    : 'Would you like to join?';
  const dialogAction = hasJoined ? 'UnJoin' : 'Join';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Toaster />
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {dialogAction}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <ProtectRoute>
          <DialogHeader>
            <DialogTitle className="text-sm">{dialogTitle}</DialogTitle>
            <DialogDescription>{title}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">No</Button>
            </DialogClose>
            <Button onClick={() => handleAction(hasJoined ? 'unjoin' : 'join')}>
              Yes
            </Button>
          </DialogFooter>
        </ProtectRoute>
      </DialogContent>
    </Dialog>
  );
}

export default JoinButton;
