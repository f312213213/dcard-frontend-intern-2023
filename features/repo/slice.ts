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
          page: 1,
          tasks: [],
          hasMore: true,
          hasLabel: false,
        } as IProject
      })
    },
    updateSelectedProject: (state, action) => {
      const { selectedProject } = action.payload
      state.selectedProject = selectedProject
    },
    appendProjectTaskData: (state, action) => {
      const {
        projectName,
        projectTaskData,
      } = action.payload
      state.projects[projectName].tasks = [...state.projects[projectName].tasks, ...projectTaskData]
      state.projects[projectName].page++
    },
    updateRepoDataByField: (state, action) => {
      const {
        projectName,
        field = '',
        updatedData,
      } = action.payload
      state.projects[projectName] = {
        ...state.projects[projectName],
        [field]: updatedData,
      }
    },
    updateTaskDataByField: (state, action) => {
      const {
        projectName,
        issueNumber,
        field = '',
        updatedData,
      } = action.payload
      const taskIndex = state.projects[projectName].tasks.findIndex(task => task.number === issueNumber)
      state.projects[projectName].tasks[taskIndex] = {
        ...state.projects[projectName].tasks[taskIndex],
        [field]: updatedData,
      }
    },
  },
})

export const {
  initProjectsData,
  updateSelectedProject,
  appendProjectTaskData,
  updateRepoDataByField,
  updateTaskDataByField,
} = taskSlice.actions

export default taskSlice
