/* global document */
import React, { useRef, useState } from 'react';
import noop from 'lodash/fp/noop';
import styled from 'styled-components';
import { string } from 'prop-types';
import { Button, Flex } from '../../ui';
import { BASE_URL } from '../../../constants';

/**
 * Copies the text in a text area to the clipboard, must be used as the onClick event for a `textarea` element
 * @param {React.RefObject} textAreaRef
 * @param {Function} onSuccess
 */
export const copyToClipboard = (textAreaRef, onSuccess = noop) => (event) => {
  // This code should only be run client side
  if (typeof window !== 'undefined' && document.queryCommandSupported('copy')) {
    textAreaRef.current.select();
    document.execCommand('copy');
    event.target.focus();
    onSuccess();
  }
};

const InvisibleTextArea = styled.textarea`
  outline: none;
  border: 0;
  margin: 0;
  resize: none;
  width: 0;
  height: 0;
`;

const WishlistShareButton = ({ id }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef(null);

  return (
    <Flex justifyContent="flex-start" alignItems="flex-start" onClick={copyToClipboard(textAreaRef, () => setCopySuccess(true))}>
      <InvisibleTextArea ref={textAreaRef} value={`${BASE_URL}/wishlist/${id}`} readOnly />
      <Button small>
        {copySuccess ? 'Copied Share Link' : 'Copy Share Link'}
      </Button>
    </Flex>
  );
};

WishlistShareButton.displayName = 'WishlistShareButton';

WishlistShareButton.propTypes = {
  id: string.isRequired,
};

export default WishlistShareButton;
