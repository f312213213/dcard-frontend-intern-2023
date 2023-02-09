import { IState } from './interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IState = {
  page: 1,
  tasks: [],
  hasMore: true,
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
    restoreTask: () => initialState,
    initTask: (state, action) => {
      const { tasks } = action.payload
      state.tasks = tasks
      state.page = 2
      state.hasMore = tasks.length === 10
    },
    appendTask: (state, action) => {
      const { tasks } = action.payload
      state.tasks = [...state.tasks, ...tasks]
      state.page = state.page + 1
      state.hasMore = tasks.length === 10
    },
  },
})

export const {
  updateSelectedProject,
  restoreTask,
  initTask,
  appendTask,
} = taskSlice.actions

export default taskSlice
