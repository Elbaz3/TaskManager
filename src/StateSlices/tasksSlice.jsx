import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {  getTasks, getProblems, getUserName } from "../firebase/firebase";

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', getTasks)
export const fetchProblems = createAsyncThunk('tasks/fetchProblems', getProblems)
export const fetchUsername= createAsyncThunk('tasks/fetchUsername', getUserName)

const initialState = { 
      tasks: [],
      status: 'idle',
      problems: [],
      pStatus: 'idle',
      userName: '',
      nameStatus: 'idle'
}

const TasksSlice = createSlice({
      name: 'tasks',
      initialState,
      reducers: {
            restStatus(state, action) {
                  state.status = action.payload || 'idle'
            },
            resetPstatus(state, action) {
                  state.pStatus = action.payload || 'idle'
            },
            resetNameStatus(state, action) {
                  state.nameStatus  = action.payload || 'idle'
            },
 
      },
      extraReducers: (builder) => {
            builder
            .addCase(fetchTasks.pending, (state) => {
                  state.status = 'loading'
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                  state.status = 'success'
                  state.tasks = action.payload
            })
            .addCase(fetchTasks.rejected, (state) => {
                  state.status = 'failed'
            })
            .addCase(fetchProblems.pending, (state) => {
                  state.pStatus = 'loading'
            })
            .addCase(fetchProblems.fulfilled, (state, action) => {
                  state.pStatus = 'success'
                  state.problems = action.payload
            })
            .addCase(fetchProblems.rejected, (state) => {
                  state.pStatus = 'failed'
            })
            .addCase(fetchUsername.pending, (state) => {
                  state.nameStatus = 'loading'
            })
            .addCase(fetchUsername.fulfilled, (state, action) => {
                  state.nameStatus = 'success'
                  state.userName = action.payload || ''
            })
            .addCase(fetchUsername.rejected, (state) => {
                  state.nameStatus = 'failed'
            })
      }
})


export const { restStatus, resetPstatus, resetNameStatus } = TasksSlice.actions;

export default TasksSlice.reducer
