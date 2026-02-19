import { useState } from 'react'
import { Note } from '../types'

interface Props {
  note: Note
  updateNote: (id: string, updated: Partial<Note>) => void
  removeNote: (id: string) => void
}

function NoteComponent({ note, updateNote, removeNote }: Props) {
  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    const startX = e.clientX
    const startY = e.clientY

    const onMove = (moveEvent: MouseEvent) => {
      if (!dragging) return
      updateNote(note.id, {
        x: note.x + (moveEvent.clientX - startX),
        y: note.y + (moveEvent.clientY - startY)
      })
    }

    const onUp = () => {
      setDragging(false)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)

      const trash = document.querySelector('.trash-zone') as HTMLElement
      const rect = trash.getBoundingClientRect()
      if (
        note.x > rect.left &&
        note.x < rect.right &&
        note.y > rect.top &&
        note.y < rect.bottom
      ) {
        removeNote(note.id)
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  const onResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setResizing(true)
    const startX = e.clientX
    const startY = e.clientY

    const onMove = (moveEvent: MouseEvent) => {
      if (!resizing) return
      updateNote(note.id, {
        width: Math.max(100, note.width + (moveEvent.clientX - startX)),
        height: Math.max(100, note.height + (moveEvent.clientY - startY))
      })
    }

    const onUp = () => {
      setResizing(false)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  return (
    <div
      className="note"
      style={{
        left: note.x,
        top: note.y,
        width: note.width,
        height: note.height,
        backgroundColor: note.color
      }}
      onMouseDown={onMouseDown}
    >
      <textarea
        value={note.text}
        onChange={e => updateNote(note.id, { text: e.target.value })}
      />
      <div className="resize-handle" onMouseDown={onResizeMouseDown} />
    </div>
  )
}

export default NoteComponent