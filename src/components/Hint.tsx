import React, { useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../styles/media';
import { RegexStage } from '../types';

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

const HintButtonText = styled.button`
  appearance: none;
  border: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.5s;
`;

const HintWrapper = styled.div<{ $open: boolean }>`
  position: absolute;
  font-size: 20px;
  right: 0;
  top: -30px;
  opacity: 1;
  transition: opacity 0.5s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      ${HintButtonText} {
        opacity: 0;
      }
      ${HintContent} {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  ${HintContent} {
    ${(props) => props.$open && 'opacity: 1; visibility: visible;'}
  }

  ${mobile} {
    position: static;
    margin-bottom: 12px;
    text-align: right;
    overflow-wrap: anywhere;

    ${HintButtonText} {
      opacity: 1;
    }

    ${HintContent} {
      position: static;
      width: auto;
      margin-top: 12px;
      display: ${(props) => (props.$open ? 'block' : 'none')};
    }
  }
`;

type Props = {
  hint: RegexStage['hint'];
};

export default function Hint({ hint }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <HintWrapper $open={open}>
      <HintButtonText aria-expanded={open} onClick={() => setOpen(!open)}>
        HINT
      </HintButtonText>
      <HintContent>{hint}</HintContent>
    </HintWrapper>
  );
}
