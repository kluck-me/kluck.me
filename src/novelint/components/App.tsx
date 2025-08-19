import React, { useState, useEffect, useCallback } from 'react';
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Form,
  ButtonGroup,
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { ScrollSync, ScrollSyncPane } from '../react-scroll-sync';
import LinterOptionInput from './LinterOptionInput';
import Viewer from './Viewer';
import * as linters from '../linters';
import { LinterOptions, LinterResult } from '../types';

const initialText =
  process.env.NODE_ENV === 'development'
    ? (require('../initial-text').default as string) // eslint-disable-line global-require
    : '';

const focusMarkElementBy = (gapIndex: number): void => {
  const result = document.querySelector('.col div.form-control');
  if (!result) {
    return;
  }

  const marks = Array.from(document.querySelectorAll<HTMLElement>('mark[id^="mark-"]'));
  if (!marks.length) {
    return;
  }

  const resultRect = result.getBoundingClientRect();
  const resultTop = resultRect.top;

  let currentMark: HTMLElement | void;
  const tooltip = document.querySelector('[id^="tooltip-mark-"]');
  if (tooltip) {
    const markId = tooltip.id.replace(/^tooltip-/, '');
    const markIndex = marks.findIndex((mark) => mark.id === markId);
    marks[markIndex].click();
    const targetMarkIndex = (markIndex + gapIndex + marks.length) % marks.length;
    currentMark = marks[targetMarkIndex];
  } else {
    currentMark = marks.find((mark) => mark.getBoundingClientRect().top >= resultTop);
  }

  if (!currentMark) {
    return;
  }

  const currentMarkRect = currentMark.getBoundingClientRect();
  if (currentMarkRect.top < resultRect.top) {
    result.scrollTop += currentMarkRect.top - resultRect.top;
  } else if (currentMarkRect.bottom > resultRect.bottom) {
    result.scrollTop += currentMarkRect.bottom - resultRect.bottom;
  }
  currentMark.click();
};

const App: React.FC<{}> = () => {
  const [linterName, setLinterName] = useState<keyof typeof linters>('pub');
  const [linterOptions, setLinterOptions] = useState<LinterOptions>({});
  const [openOptions, setOpenOptions] = useState(false);
  const [text, setText] = useState(localStorage.getItem('text') || initialText);
  const [result, setResult] = useState<LinterResult | null>(null);

  const onLinterNameChange = useCallback((evt: React.ChangeEvent<HTMLSelectElement>) => {
    setLinterName(evt.target.value as keyof typeof linters);
  }, []);

  const toggleOptionsModal = useCallback(() => {
    setOpenOptions((prevOpenOptions) => !prevOpenOptions);
  }, []);

  const onEditorChange = useCallback((evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextText = evt.target.value;
    setText(nextText);
    localStorage.setItem('text', nextText);
  }, []);

  useEffect(() => {
    const nextLinterOptions: LinterOptions = {};
    linters[linterName].rules.forEach(({ name, defaultValue }) => {
      nextLinterOptions[name] = defaultValue;
    });
    setLinterOptions(nextLinterOptions);
  }, [linterName]);

  const onLintClick = useCallback(() => {
    const linter = linters[linterName];
    if (linter.lint) {
      linter.lint(text, linterOptions).then(setResult);
    }
  }, [linterName, text, linterOptions]);

  const onAutofixClick = useCallback(() => {
    const linter = linters[linterName];
    if (linter.autofix) {
      linter.autofix(text, linterOptions).then(setText);
    }
  }, [linterName, text, linterOptions]);

  const onPrevMarkClick = useCallback(() => {
    focusMarkElementBy(-1);
  }, []);

  const onNextMarkClick = useCallback(() => {
    focusMarkElementBy(1);
  }, []);

  useEffect(() => {
    const linter = linters[linterName];
    if (linter.autolint) {
      linter.autolint(text, linterOptions).then(setResult);
    }
  }, [linterName, text, linterOptions]);

  return (
    <>
      <Navbar color="light" light expand>
        <NavbarBrand tag="span">Novelint</NavbarBrand>
        <Collapse isOpen navbar>
          <Form inline="true">
            <select className="custom-select mr-2" value={linterName} onChange={onLinterNameChange}>
              {Object.values(linters).map((linter) => (
                <option key={linter.name} value={linter.name}>
                  {linter.label}
                </option>
              ))}
            </select>
            {linters[linterName].lint ? (
              <Button outline color="secondary" className="mr-2" onClick={onLintClick}>
                検証
              </Button>
            ) : null}
            {linters[linterName].autofix ? (
              <>
                <Button outline color="secondary" className="mr-2" onClick={onAutofixClick}>
                  自動修正
                </Button>
                {result ? (
                  <>
                    {result.markCount} 件のエラー
                    <ButtonGroup className="mx-2">
                      <Button outline color="secondary" onClick={onPrevMarkClick}>
                        &laquo;
                      </Button>
                      <Button outline color="secondary" onClick={onNextMarkClick}>
                        &raquo;
                      </Button>
                    </ButtonGroup>
                  </>
                ) : null}
              </>
            ) : null}
          </Form>
          <Form inline="true" className="ml-auto">
            <Button outline color="secondary" onClick={toggleOptionsModal}>
              設定
            </Button>
          </Form>
        </Collapse>
      </Navbar>

      <Modal isOpen={openOptions} toggle={toggleOptionsModal}>
        <ModalHeader toggle={toggleOptionsModal}>設定</ModalHeader>
        <ModalBody>
          {linters[linterName].rules.map((linterRule) => (
            <LinterOptionInput
              key={linterRule.name}
              rule={linterRule}
              options={linterOptions}
              setOptions={setLinterOptions}
            />
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleOptionsModal}>
            閉じる
          </Button>
        </ModalFooter>
      </Modal>

      <ScrollSync>
        <Row className="flex-grow-1 g-0">
          <Col className="d-flex flex-column">
            <ScrollSyncPane>
              <textarea
                className="form-control flex-grow-1"
                value={text}
                onChange={onEditorChange}
              />
            </ScrollSyncPane>
          </Col>
          <Col className="d-flex flex-column">
            <ScrollSyncPane>
              <div className="form-control flex-grow-1">
                {result ? <Viewer result={result} /> : null}
              </div>
            </ScrollSyncPane>
          </Col>
        </Row>
      </ScrollSync>
    </>
  );
};

export default App;
