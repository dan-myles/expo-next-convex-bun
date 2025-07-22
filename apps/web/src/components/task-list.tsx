"use client"

import { useState } from "react"
import { useMutation, useQuery } from "convex/react"

import { api } from "@acme/backend/api"

export function TaskList() {
  const [newTask, setNewTask] = useState("")
  const tasks = useQuery(api.tasks.list)
  const createTask = useMutation(api.tasks.create)
  const removeTask = useMutation(api.tasks.remove)
  const toggleTask = useMutation(api.tasks.toggle)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    await createTask({ text: newTask.trim() })
    setNewTask("")
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="mb-6 text-center text-2xl font-bold">Task List</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2
              focus:ring-2 focus:ring-blue-500 focus:outline-none
              dark:border-gray-600 dark:bg-gray-800"
          />
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white
              hover:bg-blue-600 focus:ring-2 focus:ring-blue-500
              focus:outline-none"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {tasks?.map((task: any) => (
          <div
            key={task._id}
            className="flex items-center gap-3 rounded-md border border-gray-200
              p-3 dark:border-gray-700"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask({ id: task._id })}
              className="h-4 w-4"
            />
            <span
              className={`flex-1 ${
                task.completed
                  ? "text-gray-500 line-through"
                  : "text-gray-900 dark:text-gray-100"
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => removeTask({ id: task._id })}
              className="rounded px-2 py-1 text-red-500 hover:bg-red-50
                dark:hover:bg-red-900/20"
            >
              Delete
            </button>
          </div>
        ))}
        {tasks?.length === 0 && (
          <p className="py-8 text-center text-gray-500">
            No tasks yet. Add one above!
          </p>
        )}
      </div>
    </div>
  )
}
