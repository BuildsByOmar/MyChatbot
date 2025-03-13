import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
`;

const IndicatorContainer = styled(motion.div)`
  align-self: flex-start;
  background-color: #f0f0f0;
  padding: 12px 16px;
  border-radius: 18px;
  border-bottom-left-radius: 4px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  margin: 0 2px;
  background-color: #999;
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1s infinite ease-in-out;
  
  &:nth-child(1) { animation-delay: 0s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.4s; }
`;

const TypingIndicator = () => {
  return (
    <IndicatorContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Dot />
      <Dot />
      <Dot />
    </IndicatorContainer>
  );
};

export default TypingIndicator;