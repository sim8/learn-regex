import styled from 'styled-components';
import { mobile } from '../../styles/media';

const FullScreenCenter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile} {
    position: static;
    width: auto;
    height: auto;
    min-height: calc(100svh - 60px);
    box-sizing: border-box;
    padding: 24px 20px;
    overflow-wrap: anywhere;
  }
`;

export default FullScreenCenter;
