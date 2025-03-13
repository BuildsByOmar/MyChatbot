import React from 'react';
import styled from 'styled-components';
import { useChat } from '../context/ChatContext';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #0084ff;
  color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
`;

const ClearButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Header = () => {
  const { clearChat } = useChat();
  
  return (
    <HeaderContainer>
      <Title>Assistant Virtuel</Title>
      <ClearButton onClick={clearChat}>
        Nouvelle conversation
      </ClearButton>
    </HeaderContainer>
  );
};

export default Header;