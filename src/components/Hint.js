import React from "react";
import styled from "styled-components";

const HintContent = styled.div`
  position: absolute;
  background-color: black;
  bottom: 30px;
  right: 0;
  width: 300px;
  text-align: right;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s;
`;

const HintButtonText = styled.div`
  cursor: default;
  opacity: 1;
  transition: opacity 0.5s;
`;

const HintButton = styled.div`
  position: absolute;
  font-size: 20px;
  right: 0;
  top: -30px;
  opacity: 1;
  transition: opacity 0.5s;
  &:hover {
    ${HintButtonText} {
      opacity: 0;
    }
    ${HintContent} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export default function Hint({ hint }) {
  return (
    <HintButton>
      <HintButtonText>HINT</HintButtonText>
      <HintContent>{hint}</HintContent>
    </HintButton>
  );
}
