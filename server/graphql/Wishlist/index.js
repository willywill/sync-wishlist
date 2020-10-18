import { gql } from 'apollo-server-koa';
import WishlistService from '../../services/WishlistService';

const Wishlist = gql`
  type Wishlist {
    "ID of the wishlist - this is used in generating a url to manage the wishlist"
    id: String!
    "Name of the wishlist"
    name: String # FIXME: Make this required
    "All of the items associated with this wishlist"
    items: [WishlistItem!]!
  }

  type WishlistItem {
    "ID of the item in the wishlist"
    id: String!
    "Name of the item in the wishlist"
    name: String!
    "Description of the item in the wishlist"
    description: String
    "Url of the item in the wishlist"
    url: String
    "Photo url of the item in the wishlist"
    photoUrl: String
    "List of participants for this wishlist item"
    participants: [WishlistParticipant!]!
  }

  type WishlistParticipant {
    "Name of the participant for this wishlist item"
    name: String!
  }

  input AddWishlistItemInput {
    "ID of the the wishlist"
    wishlistId: String!
    "Name of the item in the wishlist"
    name: String!
    "Description of the item in the wishlist"
    description: String
    "Url of the item in the wishlist"
    url: String
    "Photo url of the item in the wishlist"
    photoUrl: String
  }

  input RemoveWishlistItemInput {
    "ID of the the wishlist"
    wishlistId: String!
    "ID of the item in the wishlist"
    wishlistItemId: String!
  }

  input PaticpateInWishlistItemInput {
    "ID of the item in the wishlist"
    wishlistItemId: String!
    "Name of the participant for this wishlist"
    name: String!
  }

  extend type Query {
    "Get a specific wishlist"
    wishlist(id: String!): Wishlist
  }

  extend type Mutation {
    "Creates a wishlist and sends a url to manage the wishlist to the user's email"
    createWishlist(email: String!): Wishlist!
    "Add an item to a specific wishlist"
    addWishlistItem(input: AddWishlistItemInput!): Wishlist!
    ""
    removeWishlistItem(input: RemoveWishlistItemInput): Wishlist!
    "Claiming some level of responsibility for making this wishlist item a reality"
    particpateInWishlistItem(input: PaticpateInWishlistItemInput!): WishlistItem!
  }
`;

export const resolver = {
  Wishlist: {
    id: wishlist => wishlist.id,
    items: wishlist => wishlist.items,
  },
  Query: {
    wishlist: (parent, args, ctx) => WishlistService(ctx).getWishlist(args.id),
  },
  Mutation: {
    createWishlist: (parent, args, ctx) => WishlistService(ctx).createWishlist(args.email),
    addWishlistItem: (parent, args, ctx) => WishlistService(ctx).addWishlistItem(args.input),
    removeWishlistItem: (parent, args, ctx) => WishlistService(ctx).removeWishlistItem(args.input),
  },
};

export default () => [Wishlist];
