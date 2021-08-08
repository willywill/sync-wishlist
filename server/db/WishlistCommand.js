import omit from 'lodash/fp/omit';
import isUndefined from 'lodash/fp/isUndefined';
import first from 'lodash/fp/first';
import database from '.';

const omitUndefined = omit(isUndefined);
const pullReturnValueFromInsert = (result) => first(result);

const WishlistCommand = (
  ctx,
  db = database,
) => {
  const findWishlist = (id) => db()
    .select()
    .from('wishlist')
    .where('id', id);

  const insertWishlist = (name, email, manageKey) => db()
    .insert({
      name,
      email,
      manageKey,
    })
    .into('wishlist')
    .returning('id')
    .then(pullReturnValueFromInsert);

  const insertWishlistItem = (id, item) => db()
    .insert({
      wishlist_id: id,
      name: item.name,
      description: item.description,
      url: item.url,
      photoUrl: item.photoUrl,
      price: item.price,
    })
    .into('wishlist_item');

  const updateWishlistItem = (id, item) => db()
    .update(omitUndefined({
      name: item.name,
      description: item.description,
      url: item.url,
      photoUrl: item.photoUrl,
      price: item.price,
    }))
    .from('wishlist_item')
    .where('id', id);

  const updateWishlistParticipant = (id, itemId, participantName) => db()
    .update(omitUndefined({
      name: participantName,
    }))
    .from('wishlist_participant')
    .where('wishlist_item_id', itemId);

  const deleteWishlistItem = (id, itemId) => db()
    .del()
    .from('wishlist_item')
    .where('id', itemId);

  return {
    findWishlist,
    insertWishlist,
    insertWishlistItem,
    updateWishlistItem,
    deleteWishlistItem,
    updateWishlistParticipant,
  };
};

export default WishlistCommand;
