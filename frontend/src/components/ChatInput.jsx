import React, { useState } from 'react';
import styled from 'styled-components';
import { useChat } from '../context/ChatContext';

const InputContainer = styled.div`
  display: flex;
  padding: 16px;
  border-top: 1px solid #e0e0e0;
  background-color: white;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: #0084ff;
  }
`;

const SendButton = styled.button`
  background-color: #0084ff;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0077e6;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Icône d'envoi simple en SVG
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChatInput = () => {
  const [input, setInput] = useState('');
  const { sendMessage, isTyping } = useChat();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      sendMessage(input.trim());
      setInput('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        <StyledInput
          type="text"
          placeholder="Tapez votre message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
        />
        <SendButton type="submit" disabled={!input.trim() || isTyping}>
          <SendIcon />
        </SendButton>
      </InputContainer>
    </form>
  );
};

export default ChatInput;