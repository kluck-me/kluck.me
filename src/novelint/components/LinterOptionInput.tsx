import React, { useCallback } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

import { LinterOptions, LinterRule } from '../types';

const LinterOptionInput: React.FC<{
  rule: LinterRule;
  options: LinterOptions;
  setOptions: React.Dispatch<React.SetStateAction<LinterOptions>>;
}> = ({ rule, options, setOptions }) => {
  const onCheckChange = useCallback(
    (evt) => {
      const { checked } = evt.target;
      setOptions((prevOptions) => ({ ...prevOptions, [rule.name]: checked ? 0 : -1 }));
    },
    [rule, setOptions]
  );

  const onOptionChange = useCallback(
    (evt) => {
      const { value: rawValue } = evt.target;
      setOptions((prevOptions) => ({ ...prevOptions, [rule.name]: Number(rawValue) }));
    },
    [rule, setOptions]
  );

  const id = `option-${rule.name}`;

  if ('minValue' in rule) {
    return (
      <FormGroup>
        <Label for={id}>{rule.label}</Label>
        <Input
          type="number"
          id={id}
          min={rule.minValue}
          value={options[rule.name]}
          onChange={onOptionChange}
        />
      </FormGroup>
    );
  }

  return (
    <>
      <Input
        type="checkbox"
        id={id}
        label={rule.label}
        checked={options[rule.name] >= 0}
        onChange={onCheckChange}
      />
      {rule.optionLabels ? (
        <div>
          {rule.optionLabels.map((label, i) => (
            <Input
              key={i} // eslint-disable-line react/no-array-index-key
              type="radio"
              id={`${id}-${i}`}
              name={`${id}-options`}
              label={label}
              value={i}
              checked={options[rule.name] === i}
              onChange={onOptionChange}
              disabled={options[rule.name] < 0}
              inline
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default LinterOptionInput;
