import PromiseWorker from 'promise-worker';
import * as config from './config';
import { createAsyncLint, createAsyncFormat } from '../linter';

export const { name, label, rules } = config;

const linterWorker = new PromiseWorker(new Worker(new URL('../linter-worker.ts', import.meta.url), {type: 'module'}));

export const lint = createAsyncLint(name, linterWorker);

export const autolint = lint;

export const autofix = createAsyncFormat(name, linterWorker);
