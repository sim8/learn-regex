import React from 'react';
import styled from 'styled-components';
import { RegexStage } from '../types';

const HintWrapper = styled.details`
  font-size: 20px;
  margin-bottom: 12px;
  text-align: right;
  overflow-wrap: anywhere;

  summary {
    cursor: pointer;
  }

  p {
    margin: 12px 0;
  }
`;

type Props = {
  hint: RegexStage['hint'];
};

export default function Hint({ hint }: Props) {
  return (
    <HintWrapper>
      <summary>HINT</summary>
      <p>{hint}</p>
    </HintWrapper>
  );
}
