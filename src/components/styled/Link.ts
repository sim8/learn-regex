import styled from 'styled-components';

const Link = styled.a`
  display: inline-block;
  padding: 10px;
  opacity: 0.5;
  font-size: 20px;
  text-decoration: underline;
  color: #adff12;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;

export default Link;
