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
  }
`;

const mapStateToProps = state => ({
  inputValue: getInputValue(state),
  caretPos: getCaretPos(state)
});

function Prompt({ inputValue, keyPress, keyDown }) {
  useEffect(() => _prompt.current.focus(), []);
  return (
    <InputWrapper>
      <div ref={_prompt} tabIndex="0" onKeyPress={keyPress} onKeyDown={keyDown}>
        >{inputValue}
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
