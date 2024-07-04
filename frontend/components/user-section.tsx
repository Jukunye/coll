import { useAuth } from '@/app/provider';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ArrowRightIcon, UserIcon } from './icons';

function UserSection() {
  const { user, logout } = useAuth();
  return (
    <div>
      {user ? (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p className="hidden text-xs text-slate-400 sm:block">
              {user.headline}{' '}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar>
                <AvatarImage src={user.image} alt="profile" />
                <AvatarFallback>
                  {user.firstName[0]} {user.lastName[0]}{' '}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a
                  href={`/profile/${user._id}`}
                  className="w-full text-left flex items-center gap-1"
                >
                  <UserIcon />
                  Profile
                </a>{' '}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button
                  onClick={() => logout()}
                  className="w-full text-left flex items-center gap-1"
                >
                  <ArrowRightIcon /> Log out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
