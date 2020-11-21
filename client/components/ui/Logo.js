import React from 'react';
import { bool } from 'prop-types';

const Logo = () => {
  const logoSrc = '/logo-blue.png';

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
