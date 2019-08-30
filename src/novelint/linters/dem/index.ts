import PromiseWorker from 'promise-worker';
import * as config from './config';
import { createAsyncLint } from '../linter';

export const { name, label, rules } = config;

const linterWorker = new PromiseWorker(new Worker('../linter-worker.ts'));

export const lint = createAsyncLint(name, linterWorker);

export const autolint = lint;
