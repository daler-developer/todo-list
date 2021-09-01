import { createSlice } from "@reduxjs/toolkit"



const initialState = {
  createTaskWindowVisibility: false,
  editTaskWindowVisibility: false,
  selectedEditingTaskId: null,
  searchText: '',
  filter: 'all'
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCreateTaskWindowVisibility(state, action) {
      state.createTaskWindowVisibility = !state.createTaskWindowVisibility
    },
    toggleEditTaskWindowVisibility(state, action) {
      state.editTaskWindowVisibility = !state.editTaskWindowVisibility
    },
    toggleSelectedEditingTaskId(state, action) {
      const { taskId } = action.payload
      state.selectedEditingTaskId = taskId
    },
    setSearchText(state, action) {
      const { value } = action.payload
      state.searchText = value
    },
    setFilter(state, action) {
      const { to } = action.payload
      state.filter = to
    }
  }
})


export const selectCreateTaskWindowVisibility = (state) => {
  return state.ui.createTaskWindowVisibility
}

export const selectEditTaskWindowVisibility = (state) => {
  return state.ui.editTaskWindowVisibility
}

export const selectSelectedEditingTaskId = (state) => {
  return state.ui.selectedEditingTaskId
}

export const selectSearchText = (state) => {
  return state.ui.searchText
}

export const selectFilter = (state) => {
  return state.ui.filter
}

export const {
  
  toggleCreateTaskWindowVisibility,
  toggleEditTaskWindowVisibility,
  toggleSelectedEditingTaskId,
  setSearchText,
  setFilter

} = uiSlice.actions

export default uiSlice.reducer
