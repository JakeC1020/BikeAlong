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
  background: ${props => {
    if (props.isPanicking) return '#B45152';
    else if (props.isOOB) return '#F6F7EB';
    else return '#424242';
  }};
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
  background: transparent;
  position: absolute;
  border: none;
  font-size: 22px;
  font-weight: 900;
  padding: 22px 32px;
  right: 0;
  top: 0;
  margin-right: 22px;
  margin-top: 20px;
  border-radius: 6px;
  border: 1px solid #e1e1e2;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.85);
  transition: 0.15s ease;

  &:before {
    content: '';
    width: inherit;
    height: inherit;
    width: 100%;
    height: calc(100% - 4px);
    position: absolute;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    top: 0px;
    left: 0;
    z-index: -1;
    transition: 0.2s ease;
    border-radius: 4px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.85);
    transform: translateY(-2px);
    box-shadow: 0px 0px 51px 0px rgba(0, 0, 0, 0.1), 0px 6px 18px 0px rgba(0, 0, 0, 0.2);
    color: #525253;
  }

  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(-4px);
  }
`;

export default class ChildUIOverlay extends React.Component {
  render() {
    return (
      <Wrapper>
        <TopBar isPanicking={this.props.isPanicking} isOOB={this.props.isOOB}> 
          <TrackingText>Recording: </TrackingText>
          <NameText>Little Timothy</NameText>
          <StartRouteButton onClick={this.props.updatePanicking}>
            Panic!
          </StartRouteButton>
          <div className="pulsating-circle" style={pulsatingStyle} />
        </TopBar>
      </Wrapper>
    );
  }
}