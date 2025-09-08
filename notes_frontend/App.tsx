import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NotesProvider } from './src/context/NotesContext';
import { AppNavigator } from './src/navigation';

export default function App() {
  return (
    <NotesProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </NotesProvider>
  );
}
