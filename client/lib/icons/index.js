import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faBolt as faBoltSolid,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';

import {
  faClock as faClockRegular,
  faCalendar as faCalendarRegular,
} from '@fortawesome/free-regular-svg-icons';

import {
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

/**
 * Adds icons to the font awesome icon library for use within the application
 */
library.add(
  faClockRegular,
  faBoltSolid,
  faHeartSolid,
  faCalendarRegular,
  faTwitter,
);
