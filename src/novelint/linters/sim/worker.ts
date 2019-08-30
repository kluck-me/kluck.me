/* eslint-disable import/prefer-default-export */

import React from 'react';
import { rules } from './config';
import { createSyncLint, colors } from '../linter';
import { KuromojiToken, LintRange, Linters } from '../../types';

let colorIndex = -1;

const getStyle = (): React.CSSProperties => {
  colorIndex += 1;
  colorIndex %= colors.length;
  return { color: '#fff', backgroundColor: colors[colorIndex] };
};

const linters: Linters<{ input: string; tokens: KuromojiToken[] }> = {
  sim: (_text, value, { tokens }) => {
    const indexes: LintRange[] = [];
    const lastIndexes: { [k: string]: LintRange } = {};
    let textLength = 0;
    colorIndex = 0;
    tokens.forEach((token) => {
      if (
        token.pos !== '記号' &&
        token.pos !== '助詞' &&
        token.pos !== '助動詞' &&
        !/^[ぁ-ん]$/.test(token.surface_form)
      ) {
        const wordForm = token.word_type === 'KNOWN' ? token.basic_form : token.surface_form;
        const indexKey = [
          token.word_type,
          token.pos,
          token.pos_detail_1,
          token.pos_detail_2,
          token.pos_detail_3,
          wordForm,
        ].join(':');
        const index: LintRange = [
          textLength,
          textLength + token.surface_form.length,
          lastIndexes[indexKey]
            ? lastIndexes[indexKey][2]
            : {
                link: `https://thesaurus.weblio.jp/content/${encodeURIComponent(wordForm)}`,
                tooltip: indexKey,
                markProps: { style: getStyle() },
              },
        ];
        if (lastIndexes[indexKey] && textLength - lastIndexes[indexKey][1] < value) {
          indexes.push(lastIndexes[indexKey], index);
        }
        lastIndexes[indexKey] = index;
      }
      textLength += token.surface_form.length;
    });
    return indexes;
  },
};

export const lint = createSyncLint(linters, rules);
