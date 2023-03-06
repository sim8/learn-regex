import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import {
  getInputValue,
  getCaretPos,
  getHasError,
  keyPress,
  keyDown,
} from '../slices/input';

const Caret = styled.span`
  position: relative;
`;

const InputWrapper = styled.div<{ hasError: boolean }>`
  > div {
    -webkit-appearance: none;
    border: 0px solid;
    font-size: 60px;
    outline: none;
    word-break: break-all;

    &:focus ${Caret} {
      background-color: ${(props) => (props.hasError ? '#ff0000' : '#adff12')};
      color: black;
    }

    &:not(:focus) ${Caret} {
      :after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 2px solid ${(props) => (props.hasError ? '#ff0000' : '#adff12')};
      }
    }
  }
`;

function formatWithCaret(inputValue: string, caretPos: number) {
  if (caretPos === inputValue.length) {
    return (
      <span>
        {inputValue}
        <Caret>&nbsp;</Caret>
      </span>
    );
  }
  return (
    <span>
      {inputValue.substring(0, caretPos)}
      <Caret>{inputValue[caretPos]}</Caret>
      {inputValue.substring(caretPos + 1)}
    </span>
  );
}

export default function Prompt() {
  const dispatch = useAppDispatch();
  const inputValue = useAppSelector(getInputValue);
  const caretPos = useAppSelector(getCaretPos);
  const hasError = useAppSelector(getHasError);

  const promptRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (promptRef.current) {
      promptRef.current.focus();
    }
  }, []);
  const inputValueWithCaret = formatWithCaret(inputValue, caretPos);
  return (
    <InputWrapper hasError={hasError}>
      <div
        ref={promptRef}
        tabIndex={0}
        role="textbox"
        onKeyPress={(e) => dispatch(keyPress(e))}
        onKeyDown={(e) => dispatch(keyDown(e))}
      >
        &gt;
        {inputValueWithCaret}
      </div>
    </InputWrapper>
  );
}
