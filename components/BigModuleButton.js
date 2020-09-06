'use es6';

import React from 'react';
import styled from 'styled-components';

import Button from './styled/Button';
import ProgressBar from './styled/ProgressBar';

const ModuleWrapper = styled.div`
  width: 270px;
  margin: 30px 0 0 30px;
  display: inline-block;
  position: relative;
`;

const ProgressWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 17px;
  font-size: 40px;
  display: flex;
  justify-content: center;
  text-align: center;
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
  padding: 60px 0;
  width: 100%;
  position: relative;
`;

const PictureText = styled.div`
  margin: 0 auto 20px;
  padding: 2px;
  width: 70px;
`;

export default function BigModuleButton({
  module: { name, pictureText, comingSoon },
  onClick,
  percentageComplete,
}) {
  let progressIndicator;
  if (percentageComplete) {
    progressIndicator =
      percentageComplete === 1 ? (
        <span>&#10004;</span>
      ) : (
        <ProgressBar
          width="70px"
          percentageComplete={percentageComplete}
          style={{ position: 'relative', bottom: '10px' }}
        />
      );
  }
  return (
    <ModuleWrapper>
      <ModuleButton
        onClick={onClick}
        disabled={comingSoon}
        style={{ opacity: comingSoon ? 0.3 : 1 }}
      >
        <PictureText className="code" role="img">
          {pictureText}
        </PictureText>
        {name}
        {progressIndicator && (
          <ProgressWrapper>{progressIndicator}</ProgressWrapper>
        )}
      </ModuleButton>
      {comingSoon && <ComingSoonWrapper>COMING SOON</ComingSoonWrapper>}
    </ModuleWrapper>
  );
}
