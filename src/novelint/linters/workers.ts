import * as pubWorker from './pub/worker';
import * as eosWorker from './eos/worker';
import * as simWorker from './sim/worker';
import * as demWorker from './dem/worker';
import { KuromojiToken, LinterWorker } from '../types';

export const pub: LinterWorker = pubWorker;
export const eos: LinterWorker = eosWorker;
export const sim: LinterWorker<{ input: string; tokens: KuromojiToken[] }> = simWorker;
export const dem: LinterWorker = demWorker;
