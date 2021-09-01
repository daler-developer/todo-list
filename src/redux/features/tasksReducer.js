import { createSlice, nanoid } from "@reduxjs/toolkit"


const updateStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const initialState = []

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTask(state, action) {
      const { text } = action.payload
      state.push({ id: nanoid(), text, completed: false })
      updateStorage(state)
    },
    deleteTask(state, action) {
      const { taskId } = action.payload
      state.splice(state.findIndex(t => t.id === taskId), 1)
      updateStorage(state)
    },
    deleteCompletedTasks(state, action) {
      const notCompletedTasks = state.filter(t => !t.completed)
      state.splice(0, state.length)
      state.push(...notCompletedTasks)
      updateStorage(state)
    },
    editTask(state, action) {
      const { taskId, newText } = action.payload
      const task = state.find(t => t.id === taskId)
      task.text = newText
      updateStorage(state)
    },
    toggleCompleted(state, action) {
      const { taskId } = action.payload
      const task = state.find(t => t.id === taskId)
      task.completed = !task.completed
      updateStorage(state)
    },
    loadTasksFromStorage(state, action) {
      const tasks = JSON.parse(localStorage.getItem('tasks'))
      if (tasks && Array.isArray(tasks)) {
        state.splice(0, state.length)
        state.push(...tasks)
      }
    }
  }
})

export const selectAllTasks = (state) => {
  return state.tasks
}

export const selectTasksByTextIncluded = (state, text) => {
  return state.tasks.filter(task => task.text.includes(text))
}

export const selectTasksByCompleted = (state) => {
  return state.tasks.filter(t => t.completed)
}

export const selectTasksByFilterAndTextIncluded = (state, filter, text) => {
  switch (filter) {
    case 'all':
      return state.tasks.filter(t => t.text.includes(text))
    case 'completed':
      return state.tasks.filter(t => t.completed && t.text.includes(text))
    case 'not_completed':
      return state.tasks.filter(t => !t.completed && t.text.includes(text))
  }
}

export const {
  
  createTask,
  deleteTask,
  editTask,
  toggleCompleted, 
  deleteCompletedTasks,
  loadTasksFromStorage

} = tasksSlice.actions

export default tasksSlice.reducer
