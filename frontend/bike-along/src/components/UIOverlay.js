import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`;

const TopBar = styled.div`
  width: 100%;
  height: 110px;
  background: #424242;
  opacity: 0.98;
  &:before {
    content: '';
    width: inherit;
    height: inherit;
    position: absolute;
    background: #fff;
    top: -5px;
    background: rgba(255, 255, 255, 0.1);
    opacity: 0.9;
  }
  box-shadow: 0px 0px 51px 0px rgba(0, 0, 0, 0.1), 0px 6px 18px 0px rgba(0, 0, 0, 0.2);
`;

const TrackingText = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  padding-top: 20px;
  padding-left: 28px;
`;

const pulsatingStyle = {
  top: '63px',
  left: '34px',
}

const NameText = styled.div`
  font-size: 32px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.85);
  padding-top: 8px;
  padding-left: 74px;
`;

const StartRouteButton = styled.button`
  position: absolute;
  border: none;
  font-size: 22px;
  padding: 22px 32px;
  right: 0;
  top: 0;
  margin-right: 22px;
  margin-top: 19px;
  border-radius: 6px;
  background: #662e2e;
`;

export default class UIOverlay extends React.Component {
  render() {
    return (
      <Wrapper>
        <TopBar> 
          <TrackingText>Currently Tracking: </TrackingText>
          <NameText>Little Timothy</NameText>
          <StartRouteButton>Create Route</StartRouteButton>
          <div className="pulsating-circle" style={pulsatingStyle} />
        </TopBar>
      </Wrapper>
    );
  }
}