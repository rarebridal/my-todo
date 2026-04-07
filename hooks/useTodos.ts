import { useState, useEffect } from "react"
import { Todo } from "@/types"

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved) setTodos(JSON.parse(saved))
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return // не сохраняем пока не прочитали
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos, loaded])

  function addTodo(text: string) {
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }])
  }

  function toggleTodo(id: number) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function deleteTodo(id: number) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function editTodo(id: number, newText: string) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text: newText } : t))
  }

  return { todos, addTodo, toggleTodo, deleteTodo, editTodo }
}