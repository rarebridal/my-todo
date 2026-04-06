import { Checkbox } from "@/components/ui/checkbox"

interface Todo {
  id: number
  text: string
  done: boolean
}

interface Props {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center gap-2">
      <Checkbox
        checked={todo.done}
        onCheckedChange={() => onToggle(todo.id)}
      />
      <span className={`flex-1 ${todo.done ? "line-through text-muted-foreground" : ""}`}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-muted-foreground hover:text-red-500 transition-colors"
      >
        ✕
      </button>
    </li>
  )
}