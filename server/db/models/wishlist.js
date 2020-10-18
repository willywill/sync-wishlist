import mongoose, { Schema } from 'mongoose';

const schemaOptions = {
  timestamps: true,
};

const schema = {
  id: { type: String, required: true },
  items: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      description: { type: String, required: false },
      url: { type: String, required: false },
      photoUrl: { type: String, required: false },
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
