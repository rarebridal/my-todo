"use client"

import { TodoItem } from "@/components/TodoItem"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Todo {
  id: number
  text: string
  done: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState("")
  const [filter, setFilter] = useState("all") // "all" | "active" | "done"
  const filteredTodos = todos.filter(t => {
  if (filter === "active") return !t.done
  if (filter === "done") return t.done
  return true // "all"
  })

  // Читаем из localStorage при первом рендере
  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved) setTodos(JSON.parse(saved))
  }, []) // [] — значит запустится один раз при загрузке страницы

  // Сохраняем в localStorage каждый раз когда todos меняется
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]) // [todos] — запускается когда todos изменился

  function addTodo() {
    if (!input.trim()) return
    setTodos([...todos, { id: Date.now(), text: input, done: false }])
    setInput("")
  }

  function toggleTodo(id: number) {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter(t => t.id !== id))
  }

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
              onKeyDown={e => e.key === "Enter" && addTodo()}
              placeholder="Новая задача..."
            />
            <Button onClick={addTodo}>Добавить</Button>
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
            />
          ))}
        </ul>
        </CardContent>
      </Card>
    </main>
  )
}