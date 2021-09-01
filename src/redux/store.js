import { configureStore } from "@reduxjs/toolkit"

import tasksReducer from "./features/tasksReducer"
import uiReducer from "./features/uiReducer"


const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    ui: uiReducer
  }
})

export default store
