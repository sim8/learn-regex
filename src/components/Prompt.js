import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getInputValue, getCaretPos } from "../selectors/inputSelectors";
import { keyPress, keyDown } from "../actions/inputActions";

const _prompt = React.createRef();

const InputWrapper = styled.div`
  > div {
    -webkit-appearance: none;
    border: 0px solid;
    font-size: 60px;
    outline: none;
    word-break: break-all;
    .caret {
      position: relative;
    }

    &:focus .caret {
      background-color: #adff12;
      color: black;
    }

    &:not(:focus) .caret {
      :after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 2px solid #adff12;
      }
    }
  }
`;

const mapStateToProps = state => ({
  inputValue: getInputValue(state),
  caretPos: getCaretPos(state)
});

function formatWithCaret(inputValue, caretPos) {
  if (caretPos === inputValue.length) {
    return (
      <span>
        {inputValue}
        <span className="caret">&nbsp;</span>
      </span>
    );
  }
  return (
    <span>
      {inputValue.substring(0, caretPos)}
      <span className="caret">{inputValue[caretPos]}</span>
      {inputValue.substring(caretPos + 1)}
    </span>
  );
}

function Prompt({ inputValue, caretPos, keyPress, keyDown }) {
  useEffect(() => _prompt.current.focus(), []);
  const inputValueWithCaret = formatWithCaret(inputValue, caretPos);
  return (
    <InputWrapper>
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
