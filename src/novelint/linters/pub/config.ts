export const name = 'pub';

export const label = '組版検証';

export const rules = [
  {
    name: 'indent',
    label: '字下げ',
    defaultValue: 0,
  },
  {
    name: 'spaceAfterMark',
    label: '感嘆符・疑問符の後の空白',
    defaultValue: 0,
  },
  {
    name: 'extraSpace',
    label: '不要な空白',
    defaultValue: 0,
  },
  {
    name: 'markBeforeCloseQuote',
    label: '閉じ括弧前の句読点',
    defaultValue: 0,
  },
  {
    name: 'doubleMark',
    label: '組で使う約物',
    defaultValue: 0,
  },
  {
    name: 'singleMark',
    label: '単独で使う約物',
    defaultValue: 0,
  },
  {
    name: 'lastChar',
    label: '文末が約物以外',
    defaultValue: 0,
  },
  {
    name: 'numberStyle',
    label: '数字表記',
    optionLabels: ['漢数字', '縦書き算用数字', '二桁縦横中', '三桁縦横中'],
    defaultValue: 0,
  },
  {
    name: 'alphabetStyle',
    label: '英字表記',
    optionLabels: ['全角英字（単語無効）', '全角英字', '一文字縦横中', '二文字縦横中'],
    defaultValue: 0,
  },
  {
    name: 'asciiMark',
    label: '半角記号',
    optionLabels: ['単語無効', '全適用'],
    defaultValue: 0,
  },
];
