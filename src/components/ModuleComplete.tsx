import { useAppSelector, useAppDispatch } from '../hooks/store';
import React from 'react';
import styled from 'styled-components';
import FullScreenCenter from './styled/FullScreenCenter';
import Button from './styled/Button';
import Checkmark from './styled/Checkmark';
import { returnToAllModules, getModuleConfig } from '../slices/moduleProgress';

const Certificate = styled.div`
  border: 4px solid #adff12;
  text-align: center;
  width: 500px;
  padding: 60px 40px;
`;

export default function ModuleComplete() {
  const moduleConfig = useAppSelector(getModuleConfig);
  const dispatch = useAppDispatch();
  return (
    <FullScreenCenter>
      <Certificate>
        <Checkmark
          style={{ margin: '30px 0 40px' }}
          width={12}
          color="#adff12"
        />
        <div style={{ marginBottom: '30px' }}>Congratulations!</div>
        <div>
          You&apos;ve completed{' '}
          <span className="code">{moduleConfig.name}</span> and earnt 300
          points.
        </div>
        <Button
          use="primary"
          style={{ margin: '50px 0' }}
          onClick={() => dispatch(returnToAllModules())}
        >
          CONTINUE
        </Button>
      </Certificate>
    </FullScreenCenter>
  );
}
