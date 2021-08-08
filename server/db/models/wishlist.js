const createWishlistTableSQL = `
  CREATE TABLE IF NOT EXISTS wishlist (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  manageKey TEXT NOT NULL
  );
`;

const createWishlistItemTableSQL = `
  CREATE TABLE IF NOT EXISTS wishlist_item (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  wishlist_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  url TEXT,
  photoUrl TEXT,
  price TEXT,
  FOREIGN KEY (wishlist_id) 
      REFERENCES wishlist (id) 
         ON DELETE CASCADE 
         ON UPDATE CASCADE
  );
`;

const createWishlistParticipantTableSQL = `
  CREATE TABLE IF NOT EXISTS wishlist_participant (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  wishlist_item_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  FOREIGN KEY (wishlist_item_id) 
      REFERENCES wishlist_item (id) 
         ON DELETE CASCADE 
         ON UPDATE CASCADE
  );
`;

export default [createWishlistTableSQL, createWishlistItemTableSQL, createWishlistParticipantTableSQL];
