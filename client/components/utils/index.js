import size from 'lodash/fp/size';

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
