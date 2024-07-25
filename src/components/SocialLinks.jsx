import React from 'react';
import { socials } from '../constants';

const SocialLinks = () => {
  return (
    <div className="social-links flex flex-wrap space-x-1">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon flex items-center justify-center"
        >
          <img
            src={social.icon}
            alt={social.name}
            className="w-7 h-7 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"          
            />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
