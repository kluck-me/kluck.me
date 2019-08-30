export const name = 'eos';

export const label = '文末検証';

export const rules = [
  {
    name: 'eos',
    label: '文末の同一音の連続許容数',
    defaultValue: 1,
    minValue: 1,
  },
];
