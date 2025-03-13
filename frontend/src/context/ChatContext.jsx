import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chat-history');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [isTyping, setIsTyping] = useState(false);

  // Sauvegarder les messages dans localStorage
  useEffect(() => {
    localStorage.setItem('chat-history', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (text) => {
    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Simuler la réflexion du bot
    setIsTyping(true);
    
    try {
      // Appel à l'API backend
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: text
      });
      
      // Délai aléatoire pour plus de naturel
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: response.data.message,
          sender: 'bot',
          timestamp: response.data.timestamp || new Date().toISOString(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 500 + Math.random() * 1000);
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      
      // Message d'erreur si l'API ne répond pas
      setTimeout(() => {
        const errorMessage = {
          id: Date.now() + 1,
          text: "Désolé, je rencontre des difficultés à me connecter. Veuillez réessayer plus tard.",
          sender: 'bot',
          timestamp: new Date().toISOString(),
        };
        
        setMessages((prev) => [...prev, errorMessage]);
        setIsTyping(false);
      }, 500);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider value={{ messages, isTyping, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);