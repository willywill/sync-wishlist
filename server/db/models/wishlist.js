import mongoose, { Schema } from 'mongoose';

const schemaOptions = {
  timestamps: true,
};

const schema = {
  name: { type: String, required: true },
  manageKey: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      description: { type: String, required: false },
      url: { type: String, required: false },
      photoUrl: { type: String, required: false },
      price: { type: String, required: false },
      participants: [
        {
          name: { type: String, required: false },
        },
      ],
    },
  ],
};

const wishlistSchema = new Schema(schema, schemaOptions);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
