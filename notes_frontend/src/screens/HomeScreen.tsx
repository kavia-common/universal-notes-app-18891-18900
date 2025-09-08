import React, { useMemo, useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNotes } from '../context/NotesContext';
import { NotesList } from '../components/NotesList';
import { FAB } from '../components/FAB';
import type { RootStackParamList } from '../utils/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { state, deleteNote, togglePin } = useNotes();
  const [search, setSearch] = useState('');

  const onPressItem = (n: { id: string }) => {
    navigation.navigate('Editor', { id: n.id });
  };

  const onLongPressItem = (n: { id: string; title: string }) => {
    Alert.alert('Note options', n.title || 'Untitled', [
      { text: n ? 'Edit' : 'Open', onPress: () => navigation.navigate('Editor', { id: n.id }) },
      { text: 'Pin/Unpin', onPress: () => togglePin(n.id) },
      { text: 'Delete', style: 'destructive', onPress: () => deleteNote(n.id) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const countText = useMemo(() => {
    const total = state.notes.length;
    const pinned = state.notes.filter((n) => n.pinned).length;
    return `${total} notes${pinned ? ` • ${pinned} pinned` : ''}`;
  }, [state.notes]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
        <Text style={styles.count}>{countText}</Text>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search notes..."
          placeholderTextColor="#9ca3af"
          style={styles.searchInput}
          clearButtonMode="while-editing"
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')}>
            <Text style={styles.clear}>Clear</Text>
          </Pressable>
        )}
      </View>

      <NotesList notes={state.notes} search={search} onPressItem={onPressItem} onLongPressItem={onLongPressItem} />

      <FAB onPress={() => navigation.navigate('Editor')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fafafa' },
  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 6 },
  title: { fontSize: 28, fontWeight: '800', color: '#111' },
  count: { color: '#6b7280', marginTop: 2 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
    marginBottom: 6,
  },
  searchInput: { flex: 1, color: '#111' },
  clear: { color: '#2563eb', fontWeight: '600' },
});
