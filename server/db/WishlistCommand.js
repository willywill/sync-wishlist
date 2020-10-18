import Wishlist from './models/wishlist';

const WishlistCommand = (
  ctx,
  db = Wishlist,
) => {
  const findWishlist = (id) => db.findOne({ id }).exec();

  const insertWishlist = (id, email) => db.create({
    id,
    email,
  });

  const updateWishlistItem = (id, item) => db.updateOne(
    { id },
    { $addToSet: { items: item } },
  );

  const updateWishlistParticpant = (id, itemId, participant) => db.updateOne(
    { id },
    { $addToSet: { items: { id: itemId, participants: participant } } },
  );

  // TODO: This doesn't work
  const deleteWishlistItem = (id, itemId) => db.updateOne(
    { id },
    { $pull: { 'wishlist.items': { id: itemId } } },
  );

  // TODO: Names aren't unique, this doesn't work
  const deleteWishlistParticpant = (id, itemId, participantName) => db.updateOne(
    { id },
    { $pull: { 'wishlist.items.participants': { name: participantName } } },
  );

  return {
    findWishlist,
    insertWishlist,
    updateWishlistItem,
    deleteWishlistItem,
    updateWishlistParticpant,
    deleteWishlistParticpant,
  };
};

export default WishlistCommand;
