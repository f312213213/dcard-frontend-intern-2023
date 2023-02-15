import { IState } from './interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IState = {
  page: 1,
  tasks: [],
  hasMore: true,
  selectedProject: '',
  projectHasLabelMap: {},
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateSelectedProject: (state, action) => {
      const { selectedProject } = action.payload
      state.selectedProject = selectedProject
    },
    restoreTask: (state) => {
      state.page = initialState.page
      state.tasks = initialState.tasks
      state.selectedProject = initialState.selectedProject
      state.hasMore = initialState.hasMore
    },
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
    updateProjectHasLabelMap: (state, action) => {
      const { selectedProject, hasStatusLabel } = action.payload
      state.projectHasLabelMap = {
        ...state.projectHasLabelMap,
        [selectedProject]: hasStatusLabel,
      }
    },
  },
})

export const {
  updateSelectedProject,
  restoreTask,
  initTask,
  appendTask,
  updateProjectHasLabelMap,
} = taskSlice.actions

export default taskSlice
