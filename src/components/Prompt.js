import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  getInputValue,
  getCaretPos,
  getHasError
} from "../selectors/inputSelectors";
import { keyPress, keyDown } from "../actions/inputActions";

const _prompt = React.createRef();

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
      background-color: ${props => (props.hasError ? "#ff0000" : "#adff12")};
      color: black;
    }

    &:not(:focus) ${Caret} {
      :after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 2px solid ${props => (props.hasError ? "#ff0000" : "#adff12")};
      }
    }
  }
`;

const mapStateToProps = state => ({
  inputValue: getInputValue(state),
  caretPos: getCaretPos(state),
  hasError: getHasError(state)
});

function formatWithCaret(inputValue, caretPos, hasError) {
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

function Prompt({ inputValue, caretPos, keyPress, keyDown, hasError }) {
  useEffect(() => _prompt.current.focus(), []);
  const inputValueWithCaret = formatWithCaret(inputValue, caretPos);
  return (
    <InputWrapper hasError={hasError}>
      <div ref={_prompt} tabIndex="0" onKeyPress={keyPress} onKeyDown={keyDown}>
        >{inputValueWithCaret}
      </div>
    </InputWrapper>
  );
}

export default connect(
  mapStateToProps,
  {
    keyPress,
    keyDown
  }
)(Prompt);
