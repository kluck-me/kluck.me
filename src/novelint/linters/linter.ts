/* eslint-disable @typescript-eslint/no-explicit-any */

import PromiseWorker from 'promise-worker';
import {
  KuromojiTokenizer,
  LintRange,
  Linters,
  Formatters,
  LinterOptions,
  LinterRule,
  LinterResultMarkNode,
  LinterResultMarkProps,
  LinterResult,
} from '../types';

export const createSyncLint = <T extends { input: string }>(
  linters: Linters<T>,
  rules: LinterRule[]
) => (data: T, options: LinterOptions): Omit<LinterResult, 'name'> => {
  const text = data.input.normalize().replace(/\r\n?/g, '\n');

  const indexes: [{ rule: LinterRule; props?: LinterResultMarkProps }, number, number][] = []; // [[rule, start, end], ...]
  rules.forEach((rule) => {
    const { name } = rule;
    if (linters[name] && options[name] > -1) {
      linters[name](text, options[name], data).forEach((r) => {
        indexes.push([{ rule, props: r[2] }, r[0], r[1]]);
      });
    }
  });

  const pairIndexes: [
    { rule: LinterRule; props?: LinterResultMarkProps } | null,
    number,
    number
  ][] = []; // [[rule, start, start], [null, start, end], ...]
  const existsIndex: { [k: string]: boolean } = {};
  indexes.forEach((index) => {
    const key = [index[0].rule.name, index[1], index[2]].join('-');
    if (!existsIndex[key]) {
      existsIndex[key] = true;
      pairIndexes.push([index[0], index[1], index[1]], [null, index[1], index[2]]);
    }
  });
  pairIndexes.sort(
    (a, b) => a[2] - b[2] || a[1] - b[1] || (a[0] == null ? 1 : b[0] == null ? -1 : 0) // eslint-disable-line no-nested-ternary
  );

  const rootNode: LinterResultMarkNode = { index: -1, nodes: [] };
  const nodeRoutes: LinterResultMarkNode[] = [rootNode];
  let startIndex = 0;
  pairIndexes.forEach((index, i) => {
    if (index[2] !== startIndex) {
      nodeRoutes[nodeRoutes.length - 1].nodes.push(text.slice(startIndex, index[2]));
      startIndex = index[2]; // eslint-disable-line prefer-destructuring
    }
    if (index[0] != null) {
      const newNode: LinterResultMarkNode = {
        tooltip: index[0].rule.label,
        markProps: {
          className: 'alert-danger',
        },
        ...index[0].props,
        index: i,
        nodes: [],
      };
      nodeRoutes[nodeRoutes.length - 1].nodes.push(newNode);
      nodeRoutes.push(newNode);
    } else {
      nodeRoutes.pop();
    }
  });
  if (text.length !== startIndex) {
    nodeRoutes[nodeRoutes.length - 1].nodes.push(text.slice(startIndex));
  }

  return {
    markNode: rootNode,
    markCount: pairIndexes.length / 2,
  };
};

export const createSyncFormat = <T extends { input: string }>(
  formatters: Formatters<T>,
  rules: LinterRule[]
) => (data: T, options: LinterOptions): { output: string } => {
  let text = data.input.normalize().replace(/\r\n?/g, '\n');

  rules.forEach(({ name }) => {
    if (formatters[name] && options[name] > -1) {
      text = formatters[name](text, options[name], data);
    }
  });

  return {
    output: text,
  };
};

export const createAsyncLint = (name: string, worker: PromiseWorker) => (
  input: string,
  options: LinterOptions
): Promise<LinterResult> =>
  worker.postMessage({
    name,
    method: 'lint',
    args: [{ input }, options],
  });

const createAsyncInitialize = <T extends {}>(
  fn: (resolve: (value: T) => void, reject: (reason?: any) => void) => void
): (() => Promise<T>) => {
  let queue: [(value: T) => void, (reason?: any) => void][];
  let response: [any, T | null];

  const sendResponse = (resolve: (value: T) => void, reject: (reason?: any) => void): void => {
    if (response[1]) {
      resolve(response[1]);
    } else {
      reject(response[0]);
    }
  };

  const setResponse = (newResponse: [any, T | null]): void => {
    response = newResponse;
    queue.forEach((fns) => {
      sendResponse(...fns);
    });
  };

  return (): Promise<T> =>
    new Promise<T>((resolve, reject): void => {
      if (response) {
        sendResponse(resolve, reject);
        return;
      }
      if (queue) {
        queue.push([resolve, reject]);
        return;
      }
      queue = [[resolve, reject]];
      fn(
        (value) => {
          setResponse([null, value]);
        },
        (reason) => {
          setResponse([reason, null]);
        }
      );
    });
};

const getTokenizer = createAsyncInitialize<KuromojiTokenizer>((resolve, reject) => {
  (window as any).kuromoji
    .builder({ dicPath: 'https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/' })
    .build((err: any, tokenizer: KuromojiTokenizer) => {
      if (err) {
        reject(err);
      } else {
        resolve(tokenizer);
      }
    });
});

export const createAsyncLintWithTokens = (name: string, worker: PromiseWorker) => async (
  input: string,
  options: LinterOptions
): Promise<LinterResult> => {
  const tokenizer = await getTokenizer();
  const tokens = tokenizer.tokenize(input);
  const result = await worker.postMessage({
    name,
    method: 'lint',
    args: [
      { input: tokens.map(({ surface_form: surfaceForm }) => surfaceForm).join(''), tokens },
      options,
    ],
  });
  return result;
};

export const createAsyncFormat = (name: string, worker: PromiseWorker) => (
  input: string,
  options: LinterOptions
): Promise<string> =>
  worker
    .postMessage({
      name,
      method: 'format',
      args: [{ input }, options],
    })
    .then(({ output }) => output);

export const cases = <T extends {}>(...fns: ((text: string, value: number) => T)[]) => (
  text: string,
  value: number
): T => fns[value](text, value);

export const mergeLints = (...fns: ((...args: any[]) => LintRange[])[]) => (
  ...args: any[]
): LintRange[] => fns.reduce((acc, cur) => acc.concat(cur(...args)), [] as LintRange[]);

export const createRegexpLint = (reg: RegExp, fn?: (m: RegExpExecArray) => boolean) => (
  text: string
): LintRange[] => {
  const res: LintRange[] = [];
  let m: RegExpExecArray | null;
  // eslint-disable-next-line no-cond-assign
  while ((m = reg.exec(text))) {
    if (!fn || fn(m)) {
      let { index } = m;
      let length = 0;
      if (m[2]) {
        index += m[1].length;
        length = m[2].length;
      } else if (m[1]) {
        length = m[1].length;
      }
      res.push([index, index + length]);
    }
  }
  return res;
};

export const colors = [
  '#c06',
  '#6c0',
  '#06c',
  '#c60',
  '#0c6',
  '#60c',
  '#900',
  '#090',
  '#009',
  '#066',
  '#606',
  '#660',
  '#099',
  '#909',
  '#990',
  '#c03',
  '#3c0',
  '#03c',
  '#c30',
  '#0c3',
  '#30c',
  '#c33',
  '#3c3',
  '#33c',
];
