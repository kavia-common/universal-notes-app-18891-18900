import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Note } from '../context/NotesContext';

type Props = {
  note: Note;
  onPress?: (note: Note) => void;
  onLongPress?: (note: Note) => void;
};

const NoteItemComponent: React.FC<Props> = ({ note, onPress, onLongPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.7 : 1, backgroundColor: note.color || '#fff' }]}
      onPress={() => onPress?.(note)}
      onLongPress={() => onLongPress?.(note)}
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {note.title || 'Untitled'}
        </Text>
        {note.pinned ? <Text style={styles.pin}>📌</Text> : null}
      </View>
      {note.content ? (
        <Text style={styles.content} numberOfLines={3}>
          {note.content}
        </Text>
      ) : null}
      <Text style={styles.date} numberOfLines={1}>
        {new Date(note.updatedAt).toLocaleString()}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e2e2e2',
    marginBottom: 12,
    gap: 6,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '600', color: '#111' },
  content: { fontSize: 14, color: '#333' },
  date: { fontSize: 12, color: '#666', marginTop: 4 },
  pin: { marginLeft: 6 },
});

export const NoteItem = memo(NoteItemComponent);
