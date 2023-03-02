import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  getInputValue,
  getCaretPos,
  getHasError,
  keyPress,
  keyDown,
} from '../slices/input';

const promptRef = React.createRef();

const Caret = styled.span`
  position: relative;
`;

const InputWrapper = styled.div`
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

const mapStateToProps = (state) => ({
  inputValue: getInputValue(state),
  caretPos: getCaretPos(state),
  hasError: getHasError(state),
});

function formatWithCaret(inputValue, caretPos) {
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

function Prompt({ inputValue, caretPos, onKeyPress, onKeyDown, hasError }) {
  useEffect(() => promptRef.current.focus(), []);
  const inputValueWithCaret = formatWithCaret(inputValue, caretPos);
  return (
    <InputWrapper hasError={hasError}>
      <div
        ref={promptRef}
        tabIndex="0"
        role="textbox"
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
      >
        &gt;
        {inputValueWithCaret}
      </div>
    </InputWrapper>
  );
}

export default connect(mapStateToProps, {
  onKeyPress: keyPress,
  onKeyDown: keyDown,
})(Prompt);
