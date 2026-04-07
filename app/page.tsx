"use client"

import { useState } from "react"
import { useTodos } from "@/hooks/useTodos"
import { TodoItem } from "@/components/TodoItem"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos()
  const [input, setInput] = useState("")
  
  type Filter = "all" | "active" | "done"
  const [filter, setFilter] = useState<Filter>("all")

  const filteredTodos = todos.filter(t => {
    if (filter === "active") return !t.done
    if (filter === "done") return t.done
    return true
  })

  return (
    <main className="max-w-md mx-auto mt-20 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Myapp Todo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTodo(input) && setInput("")}
              placeholder="Новая задача..."
            />
            <Button onClick={() => { addTodo(input); setInput("") }}>Добавить</Button>
          </div>
          <div className="flex gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>Все</Button>
            <Button variant={filter === "active" ? "default" : "outline"} onClick={() => setFilter("active")}>Активные</Button>
            <Button variant={filter === "done" ? "default" : "outline"} onClick={() => setFilter("done")}>Выполненные</Button>
          </div>
          <ul className="space-y-2">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  )
}