import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getInputValue } from "../selectors/inputSelectors";
import { keyDown } from "../actions/inputActions";

const _prompt = React.createRef();

const InputWrapper = styled.div`
  > div {
    -webkit-appearance: none;
    border: 0px solid;
    font-size: 60px;
    /* caret-color: black; */
  }
`;
// window.getSelection().anchorOffset

const mapStateToProps = state => ({
  inputValue: getInputValue(state)
});

function Prompt({ inputValue, keyDown }) {
  useEffect(() => _prompt.current.focus(), []);
  return (
    <InputWrapper>
      <div ref={_prompt} tabIndex="0" onKeyDown={keyDown}>
        >{inputValue}
      </div>
    </InputWrapper>
  );
}

export default connect(
  mapStateToProps,
  {
    keyDown
  }
)(Prompt);
