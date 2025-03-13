import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';
import { useChat } from '../context/ChatContext';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #fff;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

const EmptyStateContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  color: #666;
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 12px;
  color: #ccc;
`;

const EmptyStateTitle = styled.h3`
  margin: 0 0 8px 0;
  font-weight: 500;
`;

const EmptyStateDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  max-width: 300px;
`;

const SuggestedQuestion = styled(motion.button)`
  margin: 6px;
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 16px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const SuggestedQuestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 16px;
`;

const ChatContainer = () => {
  const { messages, isTyping, sendMessage } = useChat();
  const messagesEndRef = useRef(null);
  
  // Questions suggérées pour l'état vide
  const suggestedQuestions = [
    "Bonjour, comment ça va ?",
    "Quels sont vos horaires ?",
    "Comment puis-je vous contacter ?",
    "Quels produits proposez-vous ?"
  ];

  // Faire défiler jusqu'au dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Gérer le clic sur une question suggérée
  const handleSuggestedQuestion = (question) => {
    sendMessage(question);
  };

  return (
    <Container>
      <MessagesContainer>
        {messages.length === 0 ? (
          <EmptyStateContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <EmptyStateIcon>💬</EmptyStateIcon>
            <EmptyStateTitle>Besoin d'aide ?</EmptyStateTitle>
            <EmptyStateDescription>
              Je suis votre assistant virtuel. Posez-moi une question ou essayez l'une des suggestions ci-dessous.
            </EmptyStateDescription>
            
            <SuggestedQuestions>
              {suggestedQuestions.map((question, index) => (
                <SuggestedQuestion
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {question}
                </SuggestedQuestion>
              ))}
            </SuggestedQuestions>
          </EmptyStateContainer>
        ) : (
          <>
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>
    </Container>
  );
};

export default ChatContainer;