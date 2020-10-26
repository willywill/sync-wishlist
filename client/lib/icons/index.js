import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faUserFriends as faUserFriendsSolid,
  faCheckCircle as faCheckCircleSolid,
  faTrash as faTrashSolid,
} from '@fortawesome/free-solid-svg-icons';

// import {
//   faClock as faClockRegular,
// } from '@fortawesome/free-regular-svg-icons';

// import {
//   faTwitter,
// } from '@fortawesome/free-brands-svg-icons';

/**
 * Adds icons to the font awesome icon library for use within the application
 */
library.add(
  faUserFriendsSolid,
  faCheckCircleSolid,
  faTrashSolid,
);
