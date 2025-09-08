import React, { createContext, useContext, useMemo, useReducer, useCallback } from 'react';
import { Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: number; // epoch ms
  updatedAt: number; // epoch ms
  pinned?: boolean;
  color?: string; // optional background color for cards
};

type NotesState = {
  notes: Note[];
};

type NotesAction =
  | { type: 'ADD_NOTE'; payload: { title: string; content: string; color?: string } }
  | { type: 'UPDATE_NOTE'; payload: { id: string; title: string; content: string; color?: string; pinned?: boolean } }
  | { type: 'DELETE_NOTE'; payload: { id: string } }
  | { type: 'TOGGLE_PIN'; payload: { id: string } }
  | { type: 'RESET'; payload?: undefined };

const initialState: NotesState = {
  notes: [],
};

function notesReducer(state: NotesState, action: NotesAction): NotesState {
  switch (action.type) {
    case 'ADD_NOTE': {
      const now = Date.now();
      const newNote: Note = {
        id: uuidv4(),
        title: action.payload.title.trim(),
        content: action.payload.content.trim(),
        createdAt: now,
        updatedAt: now,
        color: action.payload.color,
        pinned: false,
      };
      return { notes: [newNote, ...state.notes] };
    }
    case 'UPDATE_NOTE': {
      const now = Date.now();
      const updated = state.notes.map((n) =>
        n.id === action.payload.id
          ? {
              ...n,
              title: action.payload.title.trim(),
              content: action.payload.content.trim(),
              color: action.payload.color ?? n.color,
              pinned: action.payload.pinned ?? n.pinned,
              updatedAt: now,
            }
          : n
      );
      return { notes: updated };
    }
    case 'DELETE_NOTE': {
      return { notes: state.notes.filter((n) => n.id !== action.payload.id) };
    }
    case 'TOGGLE_PIN': {
      const updated = state.notes.map((n) => (n.id === action.payload.id ? { ...n, pinned: !n.pinned, updatedAt: Date.now() } : n));
      // Keep pinned notes at top
      updated.sort((a, b) => {
        if ((a.pinned ? 1 : 0) !== (b.pinned ? 1 : 0)) return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
        return b.updatedAt - a.updatedAt;
      });
      return { notes: updated };
    }
    case 'RESET': {
      return initialState;
    }
    default:
      return state;
  }
}

type NotesContextValue = {
  state: NotesState;
  addNote: (title: string, content: string, color?: string) => void;
  updateNote: (id: string, title: string, content: string, color?: string, pinned?: boolean) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  reset: () => void;
};

// PUBLIC_INTERFACE
export const NotesContext = createContext<NotesContextValue | undefined>(undefined);

/**
 * PUBLIC_INTERFACE
 * NotesProvider provides an in-memory notes store with CRUD operations.
 * This is ready to be replaced with persistence (AsyncStorage or backend) without changing consumers.
 */
export const NotesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  const addNote = useCallback((title: string, content: string, color?: string) => {
    if (!title.trim() && !content.trim()) {
      Alert.alert('Empty note', 'Please add a title or content to save a note.');
      return;
    }
    dispatch({ type: 'ADD_NOTE', payload: { title, content, color } });
  }, []);

  const updateNote = useCallback((id: string, title: string, content: string, color?: string, pinned?: boolean) => {
    if (!title.trim() && !content.trim()) {
      Alert.alert('Empty note', 'Please add a title or content to save a note.');
      return;
    }
    dispatch({ type: 'UPDATE_NOTE', payload: { id, title, content, color, pinned } });
  }, []);

  const deleteNote = useCallback((id: string) => {
    dispatch({ type: 'DELETE_NOTE', payload: { id } });
  }, []);

  const togglePin = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_PIN', payload: { id } });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const value = useMemo(
    () => ({
      state,
      addNote,
      updateNote,
      deleteNote,
      togglePin,
      reset,
    }),
    [state, addNote, updateNote, deleteNote, togglePin, reset]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

// PUBLIC_INTERFACE
export function useNotes() {
  /** Hook to use the NotesContext safely. */
  const ctx = useContext(NotesContext);
  if (!ctx) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return ctx;
}
