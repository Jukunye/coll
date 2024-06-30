import React from 'react';
import UserSection from './user-section';

function AppBar() {
  return (
    <div className="w-full flex items-center justify-between px-4 sm:px-8">
      <img src="/coll.svg" alt="logo" className="w-20 h-10" />
      <UserSection />{' '}
    </div>
  );
}

export default AppBar;
