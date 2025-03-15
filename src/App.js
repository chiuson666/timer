import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: Arial, sans-serif;
`;

const TimerSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;
`;

const AlpacaIcon = styled.div`
  svg {
    width: 120px;
    height: 120px;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
    animation: bounce 2s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const TimerDisplay = styled.div`
  font-size: 6rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Milliseconds = styled.span`
  font-size: 3rem;
  opacity: 0.8;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 0 0.5rem;
  color: white;
  font-weight: bold;

  ${props => props.variant === 'start' && `
    background: #4CAF50;
    &:hover {
      background: #45a049;
    }
  `}

  ${props => props.variant === 'pause' && `
    background: #FFC107;
    &:hover {
      background: #FFB300;
    }
  `}

  ${props => props.variant === 'reset' && `
    background: #f44336;
    &:hover {
      background: #e53935;
    }
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (centiseconds) => {
    const hours = Math.floor(centiseconds / 360000);
    const minutes = Math.floor((centiseconds % 360000) / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const remainingCentiseconds = centiseconds % 100;
    
    const mainTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const fraction = String(remainingCentiseconds).padStart(2, '0');
    
    return { mainTime, fraction };
  };

  const { mainTime, fraction } = formatTime(time);

  return (
    <Container>
      <TimerSection>
        <AlpacaIcon>
          <svg viewBox="0 0 512 512" fill="white">
            <path d="M410.3 287.2c-19.1-14.5-39.5-23.2-60.6-27.7c-4.8-1-9.5-1.8-14.2-2.4c1.1-2.1 2.1-4.3 3.1-6.4
              c10.4-22.9 16.8-48.2 18.9-74.5c2.7-33.7-1.5-68.2-12.3-100.5c-8.3-24.9-20.2-48.5-35.4-70.1c-0.4-0.6-1-1-1.7-1.2
              c-0.7-0.2-1.4-0.1-2 0.2c-30.2 14.5-57.4 34.9-80.5 60.5c-25.9 28.7-46.5 62.3-61.1 99.5c-12.8 32.7-20.1 67.3-21.6 102.5
              c-14.1 1.5-28.5 4.4-43 9.2c-44.4 14.8-86.5 43.5-118.6 80.9c-2.5 2.9-0.8 7.3 2.9 7.7c20.7 2.2 41.5 0.7 61.8-4.3
              c22.7-5.6 44.4-15.6 64.2-29.4c4.8-3.3 9.4-6.9 13.9-10.6c0.9 3.2 1.9 6.3 2.9 9.4c8.9 25.8 20.7 50.4 35.3 73.5
              c16.2 25.6 35.6 49.1 57.8 70c2.8 2.6 7.2 0.6 7.3-3.2c0.5-20.8-2.7-41.5-9.4-61.2c-7.5-22-19.1-42.4-34.1-60.2
              c-3.6-4.3-7.5-8.4-11.5-12.3c2.3-1.5 4.5-3 6.8-4.6c23.5-17.1 43.5-38.5 59.1-62.8c25.7 4.9 49.7 16.1 69.9 32.6
              c22.4 18.3 40.1 42.3 51.6 69.2c1.4 3.4 6.3 3.5 7.9 0.2c9.2-19.1 14.7-39.7 16.3-60.7C413.8 297.7 412.7 289.1 410.3 287.2z"/>
          </svg>
        </AlpacaIcon>
        <TimerDisplay>
          {mainTime}
          <Milliseconds>.{fraction}</Milliseconds>
        </TimerDisplay>
      </TimerSection>
      <div>
        <Button variant="start" onClick={startTimer} disabled={isRunning}>
          开始
        </Button>
        <Button variant="pause" onClick={pauseTimer} disabled={!isRunning}>
          暂停
        </Button>
        <Button variant="reset" onClick={resetTimer}>
          重置
        </Button>
      </div>
    </Container>
  );
}

export default App; 