# React Native Authentication Context

## Introduction

This package provides a simple and reusable authentication context for React Native applications using TypeScript. It handles token-based authentication and includes local storage of the authentication token using AsyncStorage.

## Installation

First, ensure you have the required dependencies:

```bash
npm install @react-native-async-storage/async-storage
```

or if you're using Yarn:

```bash
yarn add @react-native-async-storage/async-storage
```

Note: If you're using Expo, AsyncStorage is already included as a dependency.

## Usage

### Setup the Auth Provider

Import and wrap your application with the `AuthProvider`:

```tsx
// App.tsx
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import MainApp from './MainApp';

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
```

### Using the Auth Context

Use the `useAuth` hook to access authentication functionality in your components:

```tsx
// LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  
  const handleLogin = async () => {
    try {
      // Replace with your actual API call
      const response = await fetch('https://your-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (data.token) {
        login(data.token);
      } else {
        Alert.alert('Login failed', 'Please check your credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
    }
  };
  
  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
```

### Protected Routes

Create protected routes/screens that require authentication:

```tsx
// MainApp.tsx
import React from 'react';
import { useAuth } from './contexts/AuthContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

export default function MainApp() {
  const { token } = useAuth();
  
  // Render different screens based on authentication status
  return token ? <HomeScreen /> : <LoginScreen />;
}
```

## API Reference

### `AuthProvider`

Component that provides the authentication context to its children.

### `useAuth()`

Hook that returns an object with the following properties:

- `token` (string | null): The current authentication token, or null if not authenticated.
- `login(token: string)`: Function to set the token and store it in AsyncStorage.
- `logout()`: Function to clear the token and remove it from AsyncStorage.

## Additional Features to Consider

- Add a function to check if a stored token exists on app startup
- Implement token refresh functionality
- Add token expiration handling
- Include user profile information in the context

## License

MIT
