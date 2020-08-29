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
  width: 500px;
  padding: 60px 40px;
`;

export default function ModuleComplete() {
  const moduleConfig = useSelector(getModuleConfig);
  const dispatch = useDispatch();
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
          type="primary"
          style={{ margin: '50px 0' }}
          onClick={() => dispatch(returnToAllModules())}
        >
          CONTINUE
        </Button>
      </Certificate>
    </FullScreenCenter>
  );
}
