import size from 'lodash/fp/size';
import toLower from 'lodash/fp/toLower';
import flow from 'lodash/fp/flow';

// eslint-disable-next-line import/prefer-default-export
export const buildParticipantsList = participants => {
  if (size(participants) === 0) return null;

  if (size(participants) === 1) {
    return participants[0].name;
  }

  if (size(participants) === 2) {
    return `${participants[0].name} and ${participants[1].name}`;
  }

  const [firstParticipant, secondParticipant, ...remainingParticipants] = participants;

  return `${firstParticipant.name}, ${secondParticipant.name} and ${size(remainingParticipants)} others`;
};

// Returns a number from 0-4294967295
// Copied from here - https://github.com/darkskyapp/string-hash
export const stringToNumberHash = (str) => {
  let hash = 5381;
  let i = str.length;

  while (i) {
    // eslint-disable-next-line no-bitwise, no-plusplus
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
* integers. Since we want the results to be always positive, convert the
* signed int to an unsigned by doing an unsigned bitshift. */
  // eslint-disable-next-line no-bitwise
  return hash >>> 0;
};

export const remap = ({ low1, high1, low2, high2 }) => (value) =>
  // eslint-disable-next-line no-mixed-operators
  low2 + (high2 - low2) * (value - low1) / (high1 - low1);

export const isEven = (num) => num % 2 === 0;

export const range = num => [...Array(num).keys()];

export const randomBetween = (min, max) => Math.floor(Math.random() * max) + min;

// export const nameToHueRotation = () => {
//   const num = randomBetween(0, 6);

//   const colors = {
//     0: '50',
//     1: '120',
//     2: '150',
//     3: '207',
//     4: '285',
//     5: '0',
//   };

//   return `hue-rotate(${colors[num]}deg) saturate(2.0)`;
// };

export const nameToHueRotation = flow(
  // Start by converting the name to lowercasr
  toLower,
  // Convert the lowercase name to a number hash
  stringToNumberHash,
  // Remap this number hash to a new range from 0-360
  remap({ low1: 0, low2: 0, high1: 4294967295, high2: 360 }),
  // Round the value to an int
  Math.round,
  // Return the final value as a hue rotation filter
  val => `hue-rotate(${-val}deg) saturate(2.0) contrast(1.2)`,
);
