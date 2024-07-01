import React, { ReactNode } from 'react';
import { useAuth } from './provider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import SignIn from '@/components/forms/login';

interface ProtectProps {
  children: ReactNode;
}

function ProtectRoute({ children }: ProtectProps) {
  const { user } = useAuth();
  return user ? (
    children
  ) : (
    <div className="flex items-center justify-center">
      <SignIn />
    </div>
  );
}

export default ProtectRoute;
