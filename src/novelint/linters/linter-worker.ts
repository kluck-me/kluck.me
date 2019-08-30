/* eslint-disable @typescript-eslint/no-explicit-any */
import registerPromiseWorker from 'promise-worker/register';
import * as workers from './workers';
import { LinterResult } from '../types';

registerPromiseWorker(
  ({ name, method, args }: any): LinterResult => ({
    ...(workers as any)[name][method](...args),
    name,
  })
);
