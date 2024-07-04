import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full mt-4">
      <div className="border-t pt-6">
        <p className="text-center">{`@${currentYear} Coll`}</p>
      </div>
    </footer>
  );
};

export default Footer;
