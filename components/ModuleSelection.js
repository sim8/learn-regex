import React from 'react';
import styled from 'styled-components';
import { MODULES_CONFIG } from '../constants/lessonConfig';
import Button from './styled/Button';
// import { useSelector } from 'react-redux';

// import Stage from './Stage';
// import { getModuleId } from '../selectors/moduleProgressSelectors';

const ModuleWrapper = styled.div`
  width: 270px;
  margin: 30px 0 0 30px;
  display: inline-block;
`;

const ModuleCard = styled(Button)`
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

function Module({ module: { name, pictureText, comingSoon } }) {
  return (
    <ModuleWrapper>
      <ModuleCard>
        <PictureText className="code" role="img">
          {pictureText}
        </PictureText>
        {name}
      </ModuleCard>
    </ModuleWrapper>
  );
}

export default function ModuleSelection() {
  // const isInModule = !!useSelector(getModuleId);
  return Object.keys(MODULES_CONFIG).map(key => (
    <Module key={key} module={MODULES_CONFIG[key]} />
  ));
}
