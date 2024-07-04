import React from 'react';
import UserSection from './user-section';
import Link from 'next/link';

function AppBar() {
  return (
    <div className="w-full flex items-center justify-between px-4 sm:px-8 border-b border-dashed py-2">
      <Link href="/">
        <img
          src="/coll.svg"
          alt="logo"
          className="w-20 h-12 hover:drop-shadow-md"
        />
      </Link>
      <UserSection />{' '}
    </div>
  );
}

export default AppBar;
