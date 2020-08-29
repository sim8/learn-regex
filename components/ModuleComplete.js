import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import styled from 'styled-components';
import { getModuleConfig } from '../selectors/progressSelectors';
import FullScreenCenter from './styled/FullScreenCenter';
import Button from './styled/Button';
import { returnToAllModules } from '../actions/progressActions';
import Checkmark from './styled/Checkmark';

const Certificate = styled.div`
  border: 4px solid #adff12;
  text-align: center;
  padding: 40px;
`;

const CheckmarkContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #adff12;
  margin: 0 auto;
`;

export default function ModuleComplete() {
  const moduleConfig = useSelector(getModuleConfig);
  const dispatch = useDispatch();
  return (
    <FullScreenCenter>
      <Certificate>
        <CheckmarkContainer>
          <Checkmark
            style={{ position: 'relative', top: '7px' }}
            width={9}
            color="black"
          />
        </CheckmarkContainer>
        <div>Congratulations!</div>
        <div>
          You&apos;ve completed{' '}
          <span className="code">{moduleConfig.name}</span> and earnt 300
          points.
        </div>
        <Button type="primary" onClick={() => dispatch(returnToAllModules())}>
          CONTINUE
        </Button>
      </Certificate>
    </FullScreenCenter>
  );
}
