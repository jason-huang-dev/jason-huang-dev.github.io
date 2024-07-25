import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-eerieBlack text-white text-center py-4">
      <p className="text-sm">
        &copy; {currentYear} Jason Huang. All rights reserved.
      </p>
      <p className="text-sm mt-2">
        Special thanks to{' '}
        <a
          href="https://github.com/shaqdeff"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline"
        >
          Shaquille Ndunda
        </a>{' '}
        for the template.
      </p>
    </footer>
  );
};

export default Footer;
