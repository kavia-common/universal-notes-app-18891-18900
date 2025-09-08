import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const PALETTE = ['#ffffff', '#fef08a', '#a7f3d0', '#bae6fd', '#fecaca', '#e9d5ff', '#fbcfe8'];

type Props = {
  value?: string;
  onChange?: (color?: string) => void;
};

export const ColorPicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <View style={styles.row}>
      {PALETTE.map((c) => {
        const selected = value === c || (!value && c === '#ffffff');
        return (
          <Pressable
            key={c}
            onPress={() => onChange?.(c === '#ffffff' ? undefined : c)}
            style={({ pressed }) => [
              styles.swatch,
              { backgroundColor: c, transform: [{ scale: pressed ? 0.96 : 1 }] },
              selected && styles.selected,
            ]}
            accessibilityLabel={`Color ${c}`}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, paddingVertical: 8 },
  swatch: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d4d4d4',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#2563eb',
  },
});
