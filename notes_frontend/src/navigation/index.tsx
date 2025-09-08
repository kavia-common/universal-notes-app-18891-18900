import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { EditorScreen } from '../screens/EditorScreen';
import type { RootStackParamList } from '../utils/types';

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fafafa',
    primary: '#2563eb',
    text: '#111827',
    border: '#e5e7eb',
    card: '#ffffff',
    notification: '#2563eb',
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Notes' }} />
        <Stack.Screen name="Editor" component={EditorScreen} options={{ headerTitle: 'New Note' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
