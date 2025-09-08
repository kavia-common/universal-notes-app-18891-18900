import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = { onPress: () => void; label?: string };

export const FAB: React.FC<Props> = ({ onPress, label = '+' }) => {
  return (
    <Pressable style={({ pressed }) => [styles.fab, { opacity: pressed ? 0.8 : 1 }]} onPress={onPress} accessibilityLabel="Create Note">
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    backgroundColor: '#2563eb',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  label: { color: '#fff', fontSize: 28, fontWeight: '700', marginTop: -2 },
});
