import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { mobile } from '../styles/media';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { getInputValue, getHasError, updateInput } from '../slices/input';
import {
  getCanMoveToNextStage,
  moveToNextScreen,
} from '../slices/moduleProgress';

const InputWrapper = styled.form`
  display: flex;
  align-items: baseline;
  min-width: 0;
  font-size: 60px;

  ${mobile} {
    font-size: clamp(36px, 10vw, 48px);
  }
`;

const TerminalInput = styled.input<{ $hasError: boolean }>`
  appearance: none;
  min-width: 0;
  width: 100%;
  border: 0;
  border-radius: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  caret-color: ${(props) => (props.$hasError ? '#ff0000' : '#adff12')};
  caret-shape: block;

  @media (pointer: coarse) {
    border-bottom: 1px solid #adff1260;
  }

  &:focus {
    outline: none;
  }

  &::selection {
    background: #adff12;
    color: black;
  }
`;

export default function Prompt() {
  const dispatch = useAppDispatch();
  const inputValue = useAppSelector(getInputValue);
  const hasError = useAppSelector(getHasError);
  const canContinue = useAppSelector(getCanMoveToNextStage);
  const promptRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Phones need a user tap to open the keyboard. Avoid scrolling the lesson
    // to the input on load, while keeping desktop typing ready immediately.
    if (window.matchMedia('(pointer: fine)').matches) {
      promptRef.current?.focus({ preventScroll: true });
    }
  }, []);

  return (
    <InputWrapper
      onSubmit={(event) => {
        event.preventDefault();
        if (canContinue) dispatch(moveToNextScreen());
      }}
    >
      <label htmlFor="regex-input" aria-hidden="true">
        &gt;
      </label>
      <TerminalInput
        id="regex-input"
        ref={promptRef}
        type="text"
        aria-label="Regex input"
        aria-invalid={hasError}
        $hasError={hasError}
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="go"
        value={inputValue}
        onChange={(event) => dispatch(updateInput(event.target.value))}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && event.nativeEvent.isComposing) {
            event.preventDefault();
          }
        }}
      />
    </InputWrapper>
  );
}
