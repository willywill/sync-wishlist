import omit from 'lodash/fp/omit';
import isUndefined from 'lodash/fp/isUndefined';
import first from 'lodash/fp/first';
import { nanoid } from 'nanoid';
import config from '../config';
import WishlistCommand from '../db/WishlistCommand';
import EmailService from './EmailService';

const buildManageWishlistUrl = (id, privateKey) => `${config.baseUrl}/wishlist/${id}?privateKey=${privateKey}`;

const omitUndefined = omit(isUndefined);

const WishlistService = (
  ctx,
  wishlistCommand = WishlistCommand(ctx),
  emailService = EmailService(ctx),
) => {
  const getWishlist = async (wishlistId) => {
    if (!wishlistId) return null;

    const wishlist = await wishlistCommand
      .findWishlist(wishlistId)
      .then(first);

    return wishlist;
  };

  const getWishlistItems = async (wishlistId) => {
    if (!wishlistId) return null;

    const wishlistItems = await wishlistCommand.findWishlistItems(wishlistId);

    return wishlistItems;
  };

  const createWishlist = async ({ name, email }) => {
    if (!email) {
      throw new Error('Cannot create a Wishlist without an email.');
    }

    try {
      // Create a url-safe key for managing this wishlist
      const privateKey = nanoid(12);
      // Create an instance of this wishlist in the DB
      const wishlistId = await wishlistCommand.insertWishlist(name, email, privateKey);
      // Build the full url
      const url = buildManageWishlistUrl(wishlistId, privateKey);
      // Email the user creating the wishlist a link to access the wishlist admin screen
      await emailService.sendWishlistManageEmail(email, url);

      return getWishlist(wishlistId);
    }
    catch (error) {
      ctx.log('error', { message: 'Unable to create wishlist', error: error.message });
      throw new Error('Failed to create Wishlist. Please try again.');
    }
  };

  const addWishlistItem = async (wishlistItem) => {
    const { wishlistId, ...wishlistItemFields } = wishlistItem;

    const itemFieldsWithValues = omitUndefined(wishlistItemFields);

    await wishlistCommand.insertWishlistItem(wishlistId, itemFieldsWithValues);
    const wishlist = await getWishlist(wishlistId);

    return wishlist;
  };

  const editWishlistItem = async (wishlistItem) => {
    const { wishlistId, ...wishlistItemFields } = wishlistItem;

    const itemFieldsWithValues = omitUndefined(wishlistItemFields);

    await wishlistCommand.updateWishlistItem(wishlistId, itemFieldsWithValues);
    const wishlist = await getWishlist(wishlistId);

    return wishlist;
  };

  const removeWishlistItem = async ({ wishlistId, wishlistItemId }) => {
    await wishlistCommand.deleteWishlistItem(wishlistId, wishlistItemId);

    const wishlist = await getWishlist(wishlistId);
    return wishlist;
  };

  const participateInWishlistItem = async ({ wishlistId, wishlistItemId, name }) => {
    await wishlistCommand.updateWishlistParticipant(wishlistId, wishlistItemId, name);

    const wishlist = await getWishlist(wishlistId);
    return wishlist;
  };

  return {
    getWishlist,
    getWishlistItems,
    createWishlist,
    addWishlistItem,
    editWishlistItem,
    removeWishlistItem,
    participateInWishlistItem,
  };
};

export default WishlistService;
