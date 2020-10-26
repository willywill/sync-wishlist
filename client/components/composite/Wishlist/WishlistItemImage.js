import React from 'react';
import { string } from 'prop-types';
import { Box } from '../../ui';

const WishlistItemImage = ({ photoUrl }) => {
  if (!photoUrl) {
    return <div style={{ width: '100px', height: '90%', backgroundColor: '#f4f4f4', borderRadius: '10px' }} />;
  }

  return (
    <Box maxWidth="100px">
      <img
        style={{ borderRadius: '10px', maxWidth: '100%', maxHeight: '100%' }}
        width="auto"
        height="auto"
        src={photoUrl}
      />
    </Box>
  );
};

WishlistItemImage.displayName = 'WishlistItemImage';

WishlistItemImage.propTypes = {
  photoUrl: string,
};

WishlistItemImage.defaultProps = {
  photoUrl: undefined,
};

export default WishlistItemImage;
