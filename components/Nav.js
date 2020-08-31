import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { returnToAllModules } from '../actions/moduleProgressActions';

const NavWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

const NavItem = styled.a`
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

export default function Nav() {
  const dispatch = useDispatch();
  return (
    <NavWrapper>
      <NavItem
        href="#"
        onClick={e => {
          e.preventDefault();
          dispatch(returnToAllModules());
        }}
      >
        ALL LESSONS
      </NavItem>
    </NavWrapper>
  );
}
