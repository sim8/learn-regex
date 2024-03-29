import styled from 'styled-components';
import React from 'react';

const ProgressBarWrapper = styled.div<{ width: string }>`
  border: 2px solid #adff12;
  box-sizing: border-box;
  width: ${(props) => props.width};
  height: 10px;
`;

const Progress = styled.div<{ percentageComplete: number }>`
  height: 100%;
  background-color: #adff12;
  width: ${(props) => props.percentageComplete * 100}%;
`;

type Props = React.HTMLProps<HTMLDivElement> & {
  percentageComplete: number;
  width: string;
};

export default function ProgressBar({
  width = '100%',
  percentageComplete = 0.5,
  ...rest
}: Props) {
  return (
    // @ts-expect-error no idea
    <ProgressBarWrapper width={width} {...rest}>
      <Progress percentageComplete={percentageComplete} />
    </ProgressBarWrapper>
  );
}
