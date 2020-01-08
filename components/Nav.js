import Link from "next/link";
import styled from "styled-components";

const NavWrapper = styled.div`
  position: fixed;
  right: 10px;
  bottom: 10px;
  font-size: 16px;
  a {
    color: inherit;
    text-transform: uppercase;
    text-decoration: none;
  }
  a + a {
    margin-left: 10px;
  }
  .score {
    margin-left: 20px;
  }
`;

const HeartPositioner = styled.span`
  position: relative;
  left: 2px;
`;

const Nav = () => {
  return (
    <NavWrapper>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/test">
        <a>Test</a>
      </Link>
      <span className="score">
        580<HeartPositioner>&hearts;</HeartPositioner>
      </span>
    </NavWrapper>
  );
};

export default Nav;
