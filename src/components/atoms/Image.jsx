import React from 'react';

function Image({ src, alt, className, ...props }) {
  return <img src={src} alt={alt} className={`block ${className}`} {...props} />;
}

export default Image;