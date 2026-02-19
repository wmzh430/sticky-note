import { useState, useEffect } from 'react'
import { Note } from './types'
import NoteComponent from './components/Note'

const COLORS = ['#ffeb3b', '#ffc107', '#ff9800', '#8bc34a']

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const createNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      x: 100,
      y: 100,
      width: 200,
      height: 150,
      text: 'New Note',
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }
    setNotes([...notes, newNote])
  }

  const updateNote = (id: string, updated: Partial<Note>) => {
    setNotes(notes.map(n => (n.id === id ? { ...n, ...updated } : n)))
  }

  const removeNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  return (
    <div className="app">
      <button className="create-btn" onClick={createNote}>Create Note</button>
      <div className="trash-zone">🗑 Drag Here to Delete</div>
      {notes.map(note => (
        <NoteComponent
          key={note.id}
          note={note}
          updateNote={updateNote}
          removeNote={removeNote}
        />
      ))}
    </div>
  )
}

export default App