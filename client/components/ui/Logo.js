import React from 'react';
import { bool } from 'prop-types';

const Logo = ({ banner }) => {
  const logoSrc = banner
    ? '/LogoBanner.svg'
    : '/Logo.svg';

  return (
    <img
      width="100%"
      height="auto"
      src={logoSrc}
      alt="Brand Logo"
    />
  );
};

Logo.propTypes = {
  banner: bool,
};

Logo.defaultProps = {
  banner: false,
};

export default Logo;
