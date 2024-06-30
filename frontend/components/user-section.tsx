import { useAuth } from '@/app/provider';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

function UserSection() {
  const { user, logout } = useAuth();
  return (
    <div>
      {user ? (
        <div className="flex items-center gap-3">
          <div>{user.firstName}</div>
          <Button onClick={() => logout()} variant="outline">
            Log out
          </Button>
        </div>
      ) : (
        <div className="flex gap-3 ">
          <Button asChild variant="ghost">
            <Link href="/auth/signin">Log in</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/auth/signup">Sign up</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserSection;
