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
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Task List</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {tasks?.map((task: any) => (
          <div
            key={task._id}
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-md dark:border-gray-700"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask({ id: task._id })}
              className="w-4 h-4"
            />
            <span
              className={`flex-1 ${
                task.completed
                  ? "line-through text-gray-500"
                  : "text-gray-900 dark:text-gray-100"
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => removeTask({ id: task._id })}
              className="px-2 py-1 text-red-500 hover:bg-red-50 rounded dark:hover:bg-red-900/20"
            >
              Delete
            </button>
          </div>
        ))}
        {tasks?.length === 0 && (
          <p className="text-center text-gray-500 py-8">No tasks yet. Add one above!</p>
        )}
      </div>
    </div>
  )
}
