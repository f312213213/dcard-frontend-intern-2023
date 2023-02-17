import { HYDRATE } from 'next-redux-wrapper'
import { IProject, IState } from './interface'
import { RootState } from '@/features/store'
import { createAction, createSlice } from '@reduxjs/toolkit'

const initialState: IState = {
  selectedProject: '',
  projects: {},
}

const taskSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    initProjectsData: (state, action) => {
      const { projects = [] } = action.payload
      projects.forEach((project: any) => {
        state.projects[project.repoName] = {
          ...project,
        } as IProject
      })
    },
    updateSelectedProject: (state, action) => {
      const { selectedProject } = action.payload
      state.selectedProject = selectedProject
    },
    initProjectTaskData: (state, action) => {
      const {
        projectName,
        projectTaskData,
      } = action.payload
      state.projects[projectName] = {
        ...projectTaskData,
      }
    },
    appendProjectTaskData: (state, action) => {
      const {
        projectName,
        projectTaskData,
      } = action.payload
      state.projects[projectName].tasks = [...state.projects[projectName].tasks, ...projectTaskData]
      state.projects[projectName].page++
    },
    updateTaskDataByField: (state, action) => {
      const {
        projectName,
        taskId,
        field = '',
        updatedData,
      } = action.payload
      const taskIndex = state.projects[projectName].tasks.findIndex(task => task.id === taskId)
      state.projects[projectName].tasks[taskIndex] = {
        ...state.projects[projectName].tasks[taskIndex],
        [field]: updatedData,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAction<RootState>(HYDRATE), (state, action) => ({
      ...state,
      ...action.payload.repo,
    }))
  },
})

export const {
  initProjectsData,
  updateSelectedProject,
  initProjectTaskData,
  appendProjectTaskData,
  updateTaskDataByField,
} = taskSlice.actions

export default taskSlice
