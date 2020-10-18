import { nanoid } from 'nanoid';
import omit from 'lodash/fp/omit';
import isUndefined from 'lodash/fp/isUndefined';
import config from '../config';
import WishlistCommand from '../db/WishlistCommand';
import EmailService from './EmailService';

// TODO: Put this in a constants file
const URL_ID_LENGTH = 8;

const buildManageWishlistUrl = id => `${config.baseUrl}/wishlist/${id}`;

const omitUndefined = omit(isUndefined);

const WishlistService = (
  ctx,
  wishlistCommand = WishlistCommand(ctx),
  emailService = EmailService(ctx),
) => {
  const getWishlist = (wishlistId) => {
    if (!wishlistId) return null;

    return wishlistCommand.findWishlist(wishlistId);
  };

  const createWishlist = async (email) => {
    if (!email) {
      throw new Error('Cannot create a Wishlist without an email.');
    }

    try {
      // Generate the manage wishlist url ID
      const urlSafeId = nanoid(URL_ID_LENGTH);
      // Create an instance of this wishlist in the DB
      const wishlist = await wishlistCommand.insertWishlist(urlSafeId, email);
      // Build the full url
      const url = buildManageWishlistUrl(urlSafeId);
      // Email the user creating the wishlist a link to access the wishlist admin screen
      await emailService.sendWishlistManageEmail(email, url);

      return wishlist;
    }
    catch (error) {
      ctx.log('error', { message: 'Unable to create wishlist', error: error.message });
      throw new Error('Failed to create Wishlist. Please try again.');
    }
  };

  const addWishlistItem = async (wishlistItem) => {
    const { wishlistId, ...wishlistItemFields } = wishlistItem;

    const itemId = nanoid(10);
    const itemFiedlsWithValues = omitUndefined({ ...wishlistItemFields, id: itemId });

    await wishlistCommand.updateWishlistItem(wishlistId, itemFiedlsWithValues);
    const wishlist = await getWishlist(wishlistId);
    return wishlist;
  };

  const removeWishlistItem = async ({ wishlistId, wishlistItemId }) => {
    await wishlistCommand.deleteWishlistItem(wishlistItemId);

    const wishlist = await getWishlist(wishlistId);
    return wishlist;
  };

  return {
    getWishlist,
    createWishlist,
    addWishlistItem,
    removeWishlistItem,
  };
};

export default WishlistService;
