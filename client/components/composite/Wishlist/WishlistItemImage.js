import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { Flex } from '../../ui';

const ImageContainer = styled(Flex)`
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const WishlistItemImage = ({ photoUrl }) => {
  if (!photoUrl) {
    return <div style={{
      marginLeft: '20px',
      marginTop: '20px',
      width: '175px',
      height: '80%',
      backgroundColor: '#f4f4f4',
      borderRadius: '10px',
    }} />;
  }

  return (
    <ImageContainer justifyContent="center" alignItems="center" maxWidth="175px">
      <img
        style={{ borderRadius: '15px', maxWidth: '100%', maxHeight: '100%' }}
        width="auto"
        height="auto"
        src={photoUrl}
      />
    </ImageContainer>
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
