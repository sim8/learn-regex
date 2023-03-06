import React from 'react';
import { useAppDispatch } from '../hooks/store';
import styled from 'styled-components';
import { returnToAllModules } from '../slices/moduleProgress';
import Link from './styled/Link';

const NavWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
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
