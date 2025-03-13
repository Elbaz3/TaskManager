import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from './StateSlices/tasksSlice'

export const store = configureStore({
      reducer: {
            tasks: tasksReducer
      }
})