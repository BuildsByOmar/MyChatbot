import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Bubble = styled(motion.div)`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 18px;
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 1.4;
  word-wrap: break-word;
  
  ${({ sender }) => sender === 'user' ? `
    align-self: flex-end;
    background-color: #0084ff;
    color: white;
    border-bottom-right-radius: 4px;
  ` : `
    align-self: flex-start;
    background-color: #f0f0f0;
    color: #333;
    border-bottom-left-radius: 4px;
  `}
`;

const Timestamp = styled.div`
  font-size: 0.7rem;
  opacity: 0.6;
  margin-top: 4px;
  text-align: right;
`;

const ChatBubble = ({ message }) => {
  // Formater l'horodatage
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Bubble 
      sender={message.sender}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {message.text}
      <Timestamp>{formatTime(message.timestamp)}</Timestamp>
    </Bubble>
  );
};

export default ChatBubble;