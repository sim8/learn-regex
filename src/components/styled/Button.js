import styled from "styled-components";

export default styled.button`
  padding: 10px 20px;
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  background-color: ${props =>
    props.type === "primary" ? "greenyellow" : "transparent"};
  color: ${props => (props.type === "primary" ? "black" : "greenyellow")};
  border: 2px solid greenyellow;
  cursor: pointer;
  margin-right: 10px;
`;
