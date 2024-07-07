import React from 'react';
import UserSection from './user-section';

function AppBar() {
  return (
    <div className="sticky top-0 w-full bg-white/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 border-b border-dashed py-2">
      <a href="/">
        <img
          src="/coll.svg"
          alt="logo"
          className="w-20 h-12 hover:drop-shadow-md"
        />
      </a>
      <UserSection />{' '}
    </div>
  );
}

export default AppBar;
