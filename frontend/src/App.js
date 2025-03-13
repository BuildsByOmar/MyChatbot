import React from 'react';
import styled from 'styled-components';
import { ChatProvider } from './context/ChatContext.jsx';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput.jsx/index.js';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

function App() {
  return (
    <ChatProvider>
      <AppContainer>
        <Header />
        <ChatContainer />
        <ChatInput />
      </AppContainer>
    </ChatProvider>
  );
}

export default App;