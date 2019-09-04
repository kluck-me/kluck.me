/* eslint-disable no-irregular-whitespace, no-useless-escape */

import { rules } from './config';
import { createSyncLint, createSyncFormat, cases, mergeLints, createRegexpLint } from '../linter';
import { Linters, Formatters } from '../../types';

// const OPEN_BRACKETS = ["\u2018", "\u201C", "\u0028", "\u3014", "\u005B", "\u007B", "\u3008", "\u300A", "\u300C", "\u300E", "\u3010", "\u2985", "\u3018", "\u3016", "\u00AB", "\u301D", "\uFF08", "\uFF3B", "\uFF5B", "\uFF5F"];
// const CLOSE_BRACKETS = ["\u2019", "\u201D", "\u0029", "\u3015", "\u005D", "\u007D", "\u3009", "\u300B", "\u300D", "\u300F", "\u3011", "\u2986", "\u3019", "\u3017", "\u00BB", "\u301F", "\uFF09", "\uFF3D", "\uFF5D", "\uFF60"];
// const HYPHENS = ["\u2010", "\u2013", "\u2014", "\u2026"];

const linters: Linters = {
  indent: mergeLints(
    createRegexpLint(
      /^[^　\u2018\u201C\u0028\u3014\u005B\u007B\u3008\u300A\u300C\u300E\u3010\u2985\u3018\u3016\u00AB\u301D\uFF08\uFF3B\uFF5B\uFF5F]/gm,
      (m) => m.input.slice(m.index, m.index + 1) !== '\n'
    ),
    createRegexpLint(
      /^(　{2,})[^\u2018\u201C\u0028\u3014\u005B\u007B\u3008\u300A\u300C\u300E\u3010\u2985\u3018\u3016\u00AB\u301D\uFF08\uFF3B\uFF5B\uFF5F]/gm,
      (m) => m.input.slice(m.index, m.index + 1) !== '\n'
    ),
    createRegexpLint(
      /^(　+)[\u2018\u201C\u0028\u3014\u005B\u007B\u3008\u300A\u300C\u300E\u3010\u2985\u3018\u3016\u00AB\u301D\uFF08\uFF3B\uFF5B\uFF5F]/gm
    )
  ),
  spaceAfterMark: mergeLints(
    createRegexpLint(
      /([！？])[^\n　！？\u2019\u201D\u0029\u3015\u005D\u007D\u3009\u300B\u300D\u300F\u3011\u2986\u3019\u3017\u00BB\u301F\uFF09\uFF3D\uFF5D\uFF60]/gm
    ),
    createRegexpLint(/([^\n　！？])(　+)/gm),
    createRegexpLint(
      /([！？])(　+)[\u2019\u201D\u0029\u3015\u005D\u007D\u3009\u300B\u300D\u300F\u3011\u2986\u3019\u3017\u00BB\u301F\uFF09\uFF3D\uFF5D\uFF60]/gm
    )
  ),
  extraSpace: createRegexpLint(/(　+)$/gm),
  markBeforeCloseQuote: createRegexpLint(
    /([、。])　*[\u2019\u201D\u0029\u3015\u005D\u007D\u3009\u300B\u300D\u300F\u3011\u2986\u3019\u3017\u00BB\u301F\uFF09\uFF3D\uFF5D\uFF60]/gm
  ),
  doubleMark: createRegexpLint(
    /([！？]{2,}|[\u2010\u2013\u2014]+|\u2026+)/gm,
    (m) => m[1].length % 2 !== 0
  ),
  singleMark: createRegexpLint(/([！？、。]{2,})/gm, (m) => /[、。]/.test(m[1])),
  lastChar: createRegexpLint(
    /([^\n　。！？\u2010\u2013\u2014\u2026\u2019\u201D\u0029\u3015\u005D\u007D\u3009\u300B\u300D\u300F\u3011\u2986\u3019\u3017\u00BB\u301F\uFF09\uFF3D\uFF5D\uFF60])[ 　]*$/gm
  ),
  numberStyle: cases(
    createRegexpLint(/([0-9０-９]+)/g),
    createRegexpLint(/([0-9０-９]+)/g, (m) => /[0-9]/.test(m[1])),
    createRegexpLint(/([0-9０-９]+)/g, (m) => {
      const half = /[0-9]/.test(m[1]);
      if (half && /[０-９]/.test(m[1])) return true;
      const len = m[1].length;
      return half ? len !== 2 : len === 2;
    }),
    createRegexpLint(/([0-9０-９]+)/g, (m) => {
      const half = /[0-9]/.test(m[1]);
      if (half && /[０-９]/.test(m[1])) return true;
      const len = m[1].length;
      return half ? len !== 2 && len !== 3 : len === 2 || len === 3;
    })
  ),
  alphabetStyle: cases(
    createRegexpLint(/([A-Za-zＡ-Ｚａ-ｚ]+)/g, (m) => {
      const half = /[A-Za-z]/.test(m[1]);
      if (half && /[Ａ-Ｚａ-ｚ]/.test(m[1])) return true;
      return half && (/^[A-Z]+$/.test(m[1]) || m[1].length <= 1);
    }),
    createRegexpLint(/([A-Za-zＡ-Ｚａ-ｚ]+)/g, (m) => /[A-Za-z]/.test(m[1])),
    createRegexpLint(/([A-Za-zＡ-Ｚａ-ｚ]+)/g, (m) => {
      const half = /[A-Za-z]/.test(m[1]);
      if (half && /[Ａ-Ｚａ-ｚ]/.test(m[1])) return true;
      const len = m[1].length;
      return half ? len < 2 : len >= 2;
    })
  ),
  asciiMark: cases(
    createRegexpLint(
      /([ -~]+)/g,
      (m) => /([\!-\/\:-\@\[-\`\{-\~]+)/.test(m[1]) && !/[0-9A-Za-z]/.test(m[1])
    ),
    createRegexpLint(/([\!-\/\:-\@\[-\`\{-\~]+)/g)
  ),
  similarLookingChar: mergeLints(
    // cf. https://dic.nicovideo.jp/a/%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A%E3%81%AB%E8%A6%8B%E3%81%88%E3%81%AA%E3%81%8F%E3%82%82%E3%81%AA%E3%81%84%E6%BC%A2%E5%AD%97%E3%81%AE%E4%B8%80%E8%A6%A7
    createRegexpLint(
      /((?<=[一-龥])[アイウエオカサセタチツテトニヌネノハヒヘマミムメモヨリルレロワンー](?![ァ-ンー])|(?<![ァ-ンー])[アイウエオカサセタチツテトニヌネノハヒヘマミムメモヨリルレロワンー](?=[ヵヶ一-龥])|ー(?=[つ]))/g
    ),
    createRegexpLint(
      /((?<=[ァ-ンー])[了亻宀工才力艹廾乜夕千⺍亍卜二又礻丿八匕乁龴三厶乂㐅乇彐刂儿乚口囗冖冫](?![ヵヶ一-龥])|(?<![一-龥])[了亻宀工才力艹廾乜夕千⺍亍卜二又礻丿八匕乁龴三厶乂㐅乇彐刂儿乚口囗冖冫](?=[ァ-ンー]))/g
    ),
    createRegexpLint(
      /((?<=[ぁ-んァ-ン])[一](?![ヵヶ一-龥])|(?<![一-龥])[一](?=[ぁ-んァ-ン]))/g,
      (m) => !/^[・つ]$/.test(m.input.slice(m.index + 1, m.index + 2))
    ),
    createRegexpLint(/([\u0387\u2022\u2219\u22C5\uFF65\u2015\uFF0D])/g) // 中黒・ハイフン
  ),
};

const toShitedString = (s: string, n: number): string =>
  String.fromCharCode(
    ...Array(s.length)
      .fill(0)
      .map((_, i) => s.charCodeAt(i) + n)
  );
const toHanCallback = (s: string): string => toShitedString(s, -0xfee0);
const toZenCallback = (s: string): string => toShitedString(s, 0xfee0);

const formatters: Formatters = {
  indent: (s) =>
    s
      .replace(
        /^[^　\u2018\u201C\u0028\u3014\u005B\u007B\u3008\u300A\u300C\u300E\u3010\u2985\u3018\u3016\u00AB\u301D\uFF08\uFF3B\uFF5B\uFF5F](?=.*?[。！？\u2010\u2013\u2014\u2026\u2019\u201D\u0029\u3015\u005D\u007D\u3009\u300B\u300D\u300F\u3011\u2986\u3019\u3017\u00BB\u301F\uFF09\uFF3D\uFF5D\uFF60][ 　]*$)/gm,
        (x) => (x !== '\n' ? `　${x.trimLeft()}` : x)
      )
      .replace(
        /^　+([\u2018\u201C\u0028\u3014\u005B\u007B\u3008\u300A\u300C\u300E\u3010\u2985\u3018\u3016\u00AB\u301D\uFF08\uFF3B\uFF5B\uFF5F])/gm,
        '$1'
      ),
  spaceAfterMark: (s) =>
    s
      .replace(
        /([！？])([^\n　！？\u2019\u201D\u0029\u3015\u005D\u007D\u3009\u300B\u300D\u300F\u3011\u2986\u3019\u3017\u00BB\u301F\uFF09\uFF3D\uFF5D\uFF60])/gm,
        '$1　$2'
      )
      .replace(/([^\n　！？])(　+)/gm, '$1')
      .replace(
        /([！？])　+([\u2019\u201D\u0029\u3015\u005D\u007D\u3009\u300B\u300D\u300F\u3011\u2986\u3019\u3017\u00BB\u301F\uFF09\uFF3D\uFF5D\uFF60])/gm,
        '$1$2'
      ),
  extraSpace: (s) => s.replace(/[ 　]+$/gm, ''),
  numberStyle: cases(
    (s) => s,
    (s) => s.replace(/[0-9]+/g, toZenCallback),
    (s) =>
      s.replace(/[0-9０-９]+/g, (m) =>
        m.length === 2 ? m.replace(/[０-９]+/g, toHanCallback) : m.replace(/[0-9]+/g, toZenCallback)
      ),
    (s) =>
      s.replace(/[0-9０-９]+/g, (m) =>
        m.length === 2 || m.length === 3
          ? m.replace(/[０-９]+/g, toHanCallback)
          : m.replace(/[0-9]+/g, toZenCallback)
      )
  ),
  alphabetStyle: cases(
    (s) =>
      s.replace(/[A-Za-zＡ-Ｚａ-ｚ]+/g, (m) =>
        m.length === 1 || /^[A-ZＡ-Ｚ]+$/.test(m) ? m.replace(/[A-Za-z]+/g, toZenCallback) : m
      ),
    (s) => s.replace(/[A-Za-z]+/g, toZenCallback),
    (s) =>
      s.replace(/[A-Za-zＡ-Ｚａ-ｚ]+/g, (m) =>
        m.length === 1
          ? m.replace(/[A-Za-z]+/g, toZenCallback)
          : m.replace(/[Ａ-Ｚａ-ｚ]+/g, toHanCallback)
      )
  ),
  asciiMark: cases((s) => s, (s) => s.replace(/[\!-\/\:-\@\[-\`\{-\~]+/g, toZenCallback)),
};

export const lint = createSyncLint(linters, rules);

export const format = createSyncFormat(formatters, rules);
