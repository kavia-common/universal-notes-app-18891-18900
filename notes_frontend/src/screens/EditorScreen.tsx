import React, { useEffect, useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNotes } from '../context/NotesContext';
import type { RootStackParamList } from '../utils/types';
import { ColorPicker } from '../components/ColorPicker';

type Props = NativeStackScreenProps<RootStackParamList, 'Editor'>;

export const EditorScreen: React.FC<Props> = ({ navigation, route }) => {
  const { state, addNote, updateNote, deleteNote, togglePin } = useNotes();
  const id = route.params?.id;
  const existing = useMemo(() => state.notes.find((n) => n.id === id), [state.notes, id]);

  const [title, setTitle] = useState(existing?.title ?? '');
  const [content, setContent] = useState(existing?.content ?? '');
  const [color, setColor] = useState<string | undefined>(existing?.color);
  const [pinned, setPinned] = useState<boolean>(existing?.pinned ?? false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: existing ? 'Edit Note' : 'New Note',
      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: 18, paddingRight: 8 }}>
          <Text style={styles.action} onPress={onSave}>
            Save
          </Text>
          {existing ? (
            <>
              <Text style={styles.action} onPress={() => { togglePin(existing.id); setPinned(!pinned); }}>
                {pinned ? 'Unpin' : 'Pin'}
              </Text>
              <Text
                style={[styles.action, { color: '#ef4444' }]}
                onPress={() =>
                  Alert.alert('Delete note?', 'This action cannot be undone.', [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Delete',
                      style: 'destructive',
                      onPress: () => {
                        deleteNote(existing.id);
                        navigation.goBack();
                      },
                    },
                  ])
                }
              >
                Delete
              </Text>
            </>
          ) : null}
        </View>
      ),
    });
  }, [navigation, existing, pinned, title, content, color]);

  const onSave = () => {
    if (existing) {
      updateNote(existing.id, title, content, color, pinned);
      navigation.goBack();
    } else {
      addNote(title, content, color);
      navigation.goBack();
    }
  };

  const bg = color || '#fff';

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <ScrollView contentContainerStyle={[styles.scroll, { backgroundColor: bg }]}>
          <TextInput
            style={styles.title}
            placeholder="Title"
            placeholderTextColor="#9ca3af"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.content}
            placeholder="Start writing..."
            placeholderTextColor="#9ca3af"
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
          />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Color</Text>
            <ColorPicker value={color} onChange={setColor} />
          </View>
          {existing ? (
            <View style={styles.meta}>
              <Text style={styles.metaText}>Created: {new Date(existing.createdAt).toLocaleString()}</Text>
              <Text style={styles.metaText}>Updated: {new Date(existing.updatedAt).toLocaleString()}</Text>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
  scroll: { padding: 16, gap: 12, minHeight: '100%' },
  title: { fontSize: 22, fontWeight: '700', color: '#111', paddingVertical: 8 },
  content: {
    minHeight: 240,
    fontSize: 16,
    color: '#111',
    paddingVertical: 8,
    lineHeight: 22,
  },
  row: { marginTop: 6 },
  rowLabel: { fontSize: 13, color: '#6b7280', marginBottom: 6, fontWeight: '600' },
  action: { color: '#2563eb', fontWeight: '700' },
  meta: { marginTop: 16, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#e5e7eb', paddingTop: 8 },
  metaText: { fontSize: 12, color: '#6b7280' },
});
