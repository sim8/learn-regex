import styled from 'styled-components';

type Props = {
  width: number;
  borderWidth: number; // remove?
};

const Checkmark = styled.div<Props>`
  display: inline-block;
  transform: rotate(45deg);
  height: ${(props) => props.width * 2.3}px;
  width: ${(props) => props.width}px;
  border-bottom: ${(props) => props.borderWidth || props.width}px solid
    ${(props) => props.color || 'white'};
  border-right: ${(props) => props.borderWidth || props.width}px solid
    ${(props) => props.color || 'white'};
`;

export default Checkmark;
