/* eslint-disable import/prefer-default-export */

import React from 'react';
import { rules } from './config';
import { createSyncLint, createRegexpLint, colors } from '../linter';
import { Linters } from '../../types';

const eosLint = createRegexpLint(
  /([^\s、。！？\u2010\u2013\u2014\u2026\u2019\u201D\u0029\u3015\u005D\u007D\u3009\u300B\u300D\u300F\u3011\u2986\u3019\u3017\u00BB\u301F\uFF09\uFF3D\uFF5D\uFF60])(?:[。！？\u2010\u2013\u2014\u2026\u2019\u201D\u0029\u3015\u005D\u007D\u3009\u300B\u300D\u300F\u3011\u2986\u3019\u3017\u00BB\u301F\uFF09\uFF3D\uFF5D\uFF60]|$)/gm
);

const regPho = /([あぁかがさざただなはばぱまやらわ])|([いぃきぎしじちぢにひびぴみり])|([うぅくぐすずつづっぬふぶぷむゆる])|([えぇけげせぜてでねへべぺめれ])|([おぉこごそぞとどのほぼぽもよろを])|([\s\S])/;

const tooltips = [
  'あ段の連続',
  'い段の連続',
  'う段の連続',
  'え段の連続',
  'お段の連続',
  'その他の連続',
];

const getStyle = (i: number): React.CSSProperties => ({
  color: '#fff',
  backgroundColor: colors[i % colors.length],
});

const defaultStyle = {
  backgroundColor: '#ccc',
};

const linters: Linters = {
  eos: (text, value) => {
    const indexes = eosLint(text);
    let currPhoIndex = -1;
    let currPhoCount = 0;
    indexes.forEach(([start, end], i) => {
      const m = regPho.exec(text.slice(start, end));
      if (!m) return;

      const phoIndex = m.slice(1).findIndex((v) => v);
      if (currPhoIndex !== phoIndex) {
        currPhoIndex = phoIndex;
        currPhoCount = 1;
      } else {
        currPhoCount += 1;
      }

      if (currPhoCount > value + 1) {
        indexes[i][2] = {
          tooltip: tooltips[currPhoIndex],
          markProps: { style: getStyle(currPhoIndex) },
        };
      } else if (currPhoCount > value) {
        for (let j = 0; j < currPhoCount; j += 1) {
          indexes[i - j][2] = {
            tooltip: tooltips[currPhoIndex],
            markProps: { style: getStyle(currPhoIndex) },
          };
        }
      } else {
        indexes[i][2] = { tooltip: tooltips[currPhoIndex], markProps: { style: defaultStyle } };
      }
    });
    return indexes;
  },
};

export const lint = createSyncLint(linters, rules);
