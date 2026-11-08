import React from 'react';
import { useAppDispatch } from '../hooks/store';
import styled from 'styled-components';
import { mobile } from '../styles/media';
import { returnToAllModules } from '../slices/moduleProgress';
import Link from './styled/Link';

const NavWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  ${mobile} {
    position: static;
    text-align: right;
    padding: 0 10px 10px;
  }
`;

export default function Nav() {
  const dispatch = useAppDispatch();
  return (
    <NavWrapper>
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          dispatch(returnToAllModules());
        }}
      >
        ALL LESSONS
      </Link>
    </NavWrapper>
  );
}
