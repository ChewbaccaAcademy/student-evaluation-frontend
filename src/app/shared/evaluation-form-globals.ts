'use strict';
export const streamOptions: string[] = ['FE', 'BE', 'QA', 'Project'];
export const communicationOptions: string[] = [
  `Is active`,
  `Is passive`,
  `Communicative`,
  `Prefers written communication over verbal`,
];
export const abilityToLearnOptions: string[] = [
  `Is able to adapt to changing topics quickly`,
  `Doesn't understand but asks, tries to learn from mistakes`,
  `Doesn't understand and does nothing about it`,
];

export const directionOptions: string[] = ['Java', 'Angular', 'Testing', 'Other'];

export const overallEvaluationOptions: { id: number; name: string }[] = [
  { id: 1, name: '1 – not suitable' },
  { id: 2, name: `2 – not so good` },
  { id: 3, name: `3 – potential to grow` },
  { id: 4, name: `4 – strong growth` },
  { id: 5, name: `5 – motivated, really good` },
];
