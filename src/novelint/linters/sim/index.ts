/* eslint-disable @typescript-eslint/no-explicit-any */

import PromiseWorker from 'promise-worker';
import * as config from './config';
import { createAsyncLintWithTokens } from '../linter';
import { LinterOptions, LinterResult } from '../../types';

export const { name, label, rules } = config;

const linterWorker = new PromiseWorker(new Worker('../linter-worker.ts'));

export const lint = createAsyncLintWithTokens(name, linterWorker);

let autolintDebounce: [number, (reason: string) => void];

export const autolint = (input: string, options: LinterOptions): Promise<LinterResult> =>
  new Promise<LinterResult>((resolve, reject): void => {
    if (autolintDebounce) {
      clearTimeout(autolintDebounce[0]);
      autolintDebounce[1]('timeout');
    }

    autolintDebounce = [
      window.setTimeout(() => {
        lint(input, options).then(resolve, reject);
      }),
      reject,
    ];
  });
