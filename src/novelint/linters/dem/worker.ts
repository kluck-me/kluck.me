/* eslint-disable import/prefer-default-export */

import { rules } from './config';
import { createSyncLint, createRegexpLint, colors } from '../linter';
import { LintRange, Linters } from '../../types';

const linters: Linters = {};

rules.forEach(({ name, label }, i) => {
  const lint = createRegexpLint(new RegExp(`(${label})`, 'g'));
  const color = colors[i % colors.length];
  const props = {
    markProps: {
      style: {
        color: '#fff',
        backgroundColor: color,
      },
    },
  };
  linters[name] = (text: string): LintRange[] =>
    lint(text).map(([start, end]) => [start, end, props]);
});

export const lint = createSyncLint(linters, rules);
