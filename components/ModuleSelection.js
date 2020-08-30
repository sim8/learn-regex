import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { MODULES_CONFIG } from '../constants/lessonConfig';
import Button from './styled/Button';
import Checkmark from './styled/Checkmark';
import { getCompletedModules } from '../selectors/overallProgressSelectors';
import { startModule } from '../actions/moduleProgressActions';
// import { useSelector } from 'react-redux';

// import Stage from './Stage';
// import { getModuleId } from '../selectors/moduleProgressSelectors';

const ModuleWrapper = styled.div`
  width: 270px;
  margin: 30px 0 0 30px;
  position: relative;
  display: inline-block;
`;

const CheckmarkWrapper = styled.div`
  position: absolute;
  left: calc(50% - 13px);
  bottom: 17px;
  font-size: 40px;
`;

const ComingSoonWrapper = styled.div`
  position: absolute;
  bottom: 23px;
  width: 100%;
  text-align: center;
`;

const ModuleButton = styled(Button)`
  border: 4px solid #adff12;
  text-align: center;
  padding: 60px 40px;
  width: 100%;
`;

const PictureText = styled.div`
  margin: 0 auto 20px;
  padding: 2px;
  width: 70px;
`;

function Module({ module: { name, pictureText, id, comingSoon }, isComplete }) {
  const dispatch = useDispatch();
  return (
    <ModuleWrapper>
      <ModuleButton
        onClick={() => dispatch(startModule(id))}
        disabled={comingSoon}
        style={{ opacity: comingSoon ? 0.3 : 1 }}
      >
        <PictureText className="code" role="img">
          {pictureText}
        </PictureText>
        {name}
      </ModuleButton>
      {isComplete && <CheckmarkWrapper>&#10004;</CheckmarkWrapper>}
      {comingSoon && <ComingSoonWrapper>COMING SOON</ComingSoonWrapper>}
    </ModuleWrapper>
  );
}

export default function ModuleSelection() {
  const completedModules = useSelector(getCompletedModules);
  // const isInModule = !!useSelector(getModuleId);
  return Object.keys(MODULES_CONFIG).map(key => (
    <Module
      key={key}
      isComplete={completedModules.get(key)}
      module={MODULES_CONFIG[key]}
    />
  ));
}
