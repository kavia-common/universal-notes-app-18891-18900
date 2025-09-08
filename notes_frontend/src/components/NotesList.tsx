import React, { useMemo } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { Note } from '../context/NotesContext';
import { NoteItem } from './NoteItem';

type Props = {
  notes: Note[];
  search: string;
  onPressItem: (n: Note) => void;
  onLongPressItem?: (n: Note) => void;
};

export const NotesList: React.FC<Props> = ({ notes, search, onPressItem, onLongPressItem }) => {
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const sorted = [...notes].sort((a, b) => {
      if ((a.pinned ? 1 : 0) !== (b.pinned ? 1 : 0)) return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
      return b.updatedAt - a.updatedAt;
    });
    if (!q) return sorted;
    return sorted.filter((n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
  }, [notes, search]);

  const sections = useMemo(() => {
    const pinned = filtered.filter((n) => n.pinned);
    const others = filtered.filter((n) => !n.pinned);
    const s: Array<{ title: string; data: Note[] }> = [];
    if (pinned.length) s.push({ title: 'Pinned', data: pinned });
    s.push({ title: 'All Notes', data: others });
    return s;
  }, [filtered]);

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => <NoteItem note={item} onPress={onPressItem} onLongPress={onLongPressItem} />}
      renderSectionHeader={({ section: { title, data } }) =>
        data.length ? (
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        ) : null
      }
      stickySectionHeadersEnabled
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No notes yet</Text>
          <Text style={styles.emptySubtitle}>Tap the + button to create your first note.</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 120,
  },
  header: {
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
  },
  headerText: { fontSize: 13, color: '#666', fontWeight: '600' },
  empty: { alignItems: 'center', marginTop: 48, gap: 8 },
  emptyTitle: { fontSize: 18, color: '#333', fontWeight: '700' },
  emptySubtitle: { fontSize: 14, color: '#666' },
});
