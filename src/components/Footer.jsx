import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-eerieBlack text-white text-center py-4">
      <p className="text-sm">
        &copy; {currentYear} Jason Huang. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
