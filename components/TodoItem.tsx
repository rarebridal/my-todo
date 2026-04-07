import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Todo } from "@/types"

interface Props {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, newText: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  function handleSave() {
    if (!editText.trim()) return
    onEdit(todo.id, editText)
    setIsEditing(false)
  }

  return (
    <li className="flex items-center gap-2">
      <Checkbox
        checked={todo.done}
        onCheckedChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <Input
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleSave()
            if (e.key === "Escape") setIsEditing(false)
          }}
          autoFocus
          className="flex-1 h-7"
        />
      ) : (
        <span
          className={`flex-1 cursor-pointer ${todo.done ? "line-through text-muted-foreground" : ""}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="text-muted-foreground hover:text-red-500 transition-colors"
      >
        ✕
      </button>
    </li>
  )
}