/* eslint-disable no-underscore-dangle */
import { gql } from 'apollo-server-koa';
import isEqual from 'lodash/fp/isEqual';
import WishlistService from '../../services/WishlistService';

const Wishlist = gql`
  type Wishlist {
    "ID of the wishlist - this is used in generating a url to manage the wishlist"
    id: String!
    "Name of the wishlist"
    name: String!
    "All of the items associated with this wishlist"
    items: [WishlistItem!]!
    "Can the current user manage this wishlist?"
    canManage: Boolean!
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
    "Price estimation of the item"
    price: String
    "List of participants for this wishlist item"
    participants: [WishlistParticipant!]
  }

  type WishlistParticipant {
    "ID of the participant"
    id: String!
    "Name of the participant for this wishlist item"
    name: String!
  }

  type WishlistPayload {
    wishlist: Wishlist!
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
    "Price estimation of the item in the wishlist"
    price: String
  }

  input EditWishlistItemInput {
    "ID of the the wishlist"
    wishlistId: String!
    "ID of the item in the wishlist"
    wishlistItemId: String!
    "Name of the item in the wishlist"
    name: String
    "Description of the item in the wishlist"
    description: String
    "Url of the item in the wishlist"
    url: String
    "Photo url of the item in the wishlist"
    photoUrl: String
    "Price estimation of the item in the wishlist"
    price: String
  }

  input RemoveWishlistItemInput {
    "ID of the the wishlist"
    wishlistId: String!
    "ID of the item in the wishlist"
    wishlistItemId: String!
  }

  input ParticipateInWishlistItemInput {
    "ID of the the wishlist"
    wishlistId: String!
    "ID of the item in the wishlist"
    wishlistItemId: String!
    "Name of the participant for this wishlist"
    name: String!
  }

  extend type Query {
    "Get a specific wishlist"
    wishlist(id: String!, privateKey: String): Wishlist
  }

  extend type Mutation {
    "Creates a wishlist and sends a url to manage the wishlist to the user's email"
    createWishlist(name: String!, email: String!): WishlistPayload!
    "Add an item to a specific wishlist"
    addWishlistItem(input: AddWishlistItemInput!): WishlistPayload!
    "Remove a specific wishlist item"
    removeWishlistItem(input: RemoveWishlistItemInput): WishlistPayload!
    "Claiming some level of responsibility for making this wishlist item a reality"
    participateInWishlistItem(input: ParticipateInWishlistItemInput!): WishlistPayload!
    "Edit a specific wishlist item"
    editWishlistItem(input: EditWishlistItemInput!): WishlistPayload!
  }
`;

export const resolver = {
  Wishlist: {
    id: wishlist => wishlist.id,
    name: wishlist => wishlist.name,
    items: (wishlist, args, ctx) => WishlistService(ctx).getWishlistItems(wishlist.id),
    canManage: wishlist => !!wishlist.canManage,
  },
  Query: {
    wishlist: (parent, args, ctx) => WishlistService(ctx).getWishlist(args.id)
      .then(wishlist => ({
        id: wishlist.id,
        name: wishlist.name,
        canManage: isEqual(String(args.privateKey), String(wishlist.manageKey)),
      })),
  },
  Mutation: {
    createWishlist: (parent, args, ctx) => WishlistService(ctx).createWishlist(args)
      .then(wishlist => ({ wishlist })),
    addWishlistItem: (parent, args, ctx) => WishlistService(ctx).addWishlistItem(args.input)
      .then(wishlist => ({ wishlist })),
    removeWishlistItem: (parent, args, ctx) => WishlistService(ctx).removeWishlistItem(args.input)
      .then(wishlist => ({ wishlist })),
    editWishlistItem: (parent, args, ctx) => WishlistService(ctx).editWishlistItem(args.input)
      .then(wishlist => ({ wishlist })),
    participateInWishlistItem: (parent, args, ctx) => WishlistService(ctx).participateInWishlistItem(args.input)
      .then(wishlist => ({ wishlist })),
  },
};

export default () => [Wishlist];
