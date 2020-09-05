import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { returnToAllModules } from '../actions/moduleProgressActions';
import Link from './styled/Link';

const NavWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

export default function Nav() {
  const dispatch = useDispatch();
  return (
    <NavWrapper>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link
        href="#"
        onClick={e => {
          e.preventDefault();
          dispatch(returnToAllModules());
        }}
      >
        ALL LESSONS
      </Link>
    </NavWrapper>
  );
}
