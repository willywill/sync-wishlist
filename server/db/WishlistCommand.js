import { Types } from 'mongoose';
import Wishlist from './models/wishlist';

const { ObjectId } = Types;

const WishlistCommand = (
  ctx,
  db = Wishlist,
) => {
  const findWishlist = (id) => db.findOne({ _id: ObjectId(id) }).exec();

  const insertWishlist = (name, email, manageKey) => db.create({
    name,
    email,
    manageKey,
  });

  const insertWishlistItem = (id, item) => db.updateOne(
    { _id: id },
    { $addToSet: { items: item } },
  );

  const updateWishlistItem = (id, item) => db.updateOne(
    { _id: id, 'items._id': item.wishlistItemId },
    { $set: {
      'items.$.name': item.name,
      'items.$.url': item.url,
      'items.$.price': item.price,
      'items.$.photoUrl': item.photoUrl,
      'items.$.description': item.description,
    } },
  );

  const updateWishlistParticpant = (id, itemId, participantName) => db.updateOne(
    { _id: id, 'items._id': itemId },
    { $push: { 'items.$.participants': { name: participantName } } },
  );

  const deleteWishlistItem = (id, itemId) =>
    db.updateOne({ _id: id }, { $pull: { items: { _id: ObjectId(itemId) } } });

  // TODO: Do we need this?
  const deleteWishlistParticpant = (id, itemId, participantId) => db.updateOne(
    { id },
    { $pull: { 'wishlist.items.participants': { _id: participantId } } },
  );

  return {
    findWishlist,
    insertWishlist,
    insertWishlistItem,
    updateWishlistItem,
    deleteWishlistItem,
    updateWishlistParticpant,
    deleteWishlistParticpant,
  };
};

export default WishlistCommand;
