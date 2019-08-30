import React from 'react';

export interface KuromojiToken {
  basic_form: string;
  conjugated_form: string;
  conjugated_type: string;
  pos: string;
  pos_detail_1: string;
  pos_detail_2: string;
  pos_detail_3: string;
  pronunciation: string;
  reading: string;
  surface_form: string;
  word_id: number;
  word_position: number;
  word_type: string;
}

export type KuromojiTokenizer = {
  tokenize: (text: string) => KuromojiToken[];
};

export type LintRange = [number, number, LinterResultMarkProps?];

export type Linters<T = { input: string }> = {
  [k: string]: (text: string, value: number, data: T) => LintRange[];
};

export type Formatters<T = { input: string }> = {
  [k: string]: (text: string, value: number, data: T) => string;
};

export interface LinterOptions {
  [k: string]: number;
}

export interface LinterRule {
  name: string;
  label: string;
  optionLabels?: string[];
  defaultValue: number;
  minValue?: number;
}

export interface LinterResultMarkProps {
  link?: string;
  tooltip?: string;
  markProps?: React.ComponentProps<'mark'>;
}

export interface LinterResultMarkNode extends LinterResultMarkProps {
  index: number;
  nodes: (LinterResultMarkNode | string)[];
}

interface LinterResultBase {
  name: string;
}

export interface LinterResultMark extends LinterResultBase {
  markNode: LinterResultMarkNode;
  markCount: number;
}

export type LinterResult = LinterResultMark;

export interface LinterWorker<T = { input: string }> {
  lint?: (data: T, options: LinterOptions) => Omit<LinterResult, 'name'>;
  format?: (data: T, options: LinterOptions) => { output: string };
}

export interface Linter {
  name: string;
  label: string;
  rules: LinterRule[];
  lint?: (input: string, options: LinterOptions) => Promise<LinterResult>;
  autolint?: (input: string, options: LinterOptions) => Promise<LinterResult>;
  autofix?: (input: string, options: LinterOptions) => Promise<string>;
}
