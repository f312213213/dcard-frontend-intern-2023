import { HYDRATE } from 'next-redux-wrapper'
import { IState } from './interface'
import { RootState } from '@/features/store'
import { createAction, createSlice } from '@reduxjs/toolkit'

const initialState: IState = {
  tasks: [],
  selectedProject: '',
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateSelectedProject: (state, action) => {
      const { selectedProject } = action.payload
      state.selectedProject = selectedProject
    },
    appendTask: (state, action) => {
      const { tasks } = action.payload
      state.tasks = tasks
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAction<RootState>(HYDRATE), (state, action) => ({
      ...state,
      ...action.payload.task,
    }))
  },
})

export const {
  updateSelectedProject,
  appendTask,
} = taskSlice.actions

export default taskSlice
