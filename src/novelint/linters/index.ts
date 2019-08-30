import * as pubLinter from './pub';
import * as eosLinter from './eos';
import * as simLinter from './sim';
import * as demLinter from './dem';
import { Linter } from '../types';

export const pub: Linter = pubLinter;
export const eos: Linter = eosLinter;
export const sim: Linter = simLinter;
export const dem: Linter = demLinter;
