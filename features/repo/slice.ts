import { EApiStatus } from '@/features/app/interface'
import { IProject, IState } from './interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IState = {
  selectedProject: '',
  projects: {},
  search: {
    queryText: '',
    tasks: [],
    page: 1,
    hasMore: true,
    total: 0,
    apiStatus: EApiStatus.INITIAL,
  },

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
          apiStatus: EApiStatus.INITIAL,
        } as IProject
      })
    },
    updateSelectedProject: (state, action) => {
      const { selectedProject } = action.payload
      state.selectedProject = selectedProject
    },
    insertNewProjectTaskData: (state, action) => {
      const {
        projectName,
        issueData,
      } = action.payload
      state.projects[projectName].tasks = [issueData, ...state.projects[projectName].tasks]
    },
    appendProjectTaskData: (state, action) => {
      const {
        projectName,
        projectTaskData,
      } = action.payload
      state.projects[projectName].tasks = [...state.projects[projectName].tasks, ...projectTaskData]
      state.projects[projectName].page++
      state.projects[projectName].hasMore = !(projectTaskData.length < 10)
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
    appendSearchResult: (state, action) => {
      const {
        queryText,
        searchResult,
      } = action.payload
      if (state.search.queryText === queryText) {
        state.search.tasks = [...state.search.tasks, ...searchResult]
        state.search.page++
      } else {
        state.search.tasks = searchResult
        state.search.page = 2
      }
      state.search.queryText = queryText
      state.search.hasMore = !(searchResult.length < 10)
    },
    updateSearchDataByField: (state, action) => {
      const {
        field = '',
        updatedData,
      } = action.payload
      state.search = {
        ...state.search,
        [field]: updatedData,
      }
    },
    updateSearchTaskDataByField: (state, action) => {
      const {
        projectName,
        issueNumber,
        field = '',
        updatedData,
      } = action.payload
      const taskIndex = state.search.tasks.findIndex(task => task.number === issueNumber && task.repoName === projectName)
      state.search.tasks[taskIndex] = {
        ...state.search.tasks[taskIndex],
        [field]: updatedData,
      }
    },
  },
})

export const {
  initProjectsData,
  updateSelectedProject,
  insertNewProjectTaskData,
  appendProjectTaskData,
  updateRepoDataByField,
  updateTaskDataByField,
  appendSearchResult,
  updateSearchDataByField,
  updateSearchTaskDataByField,
} = taskSlice.actions

export default taskSlice
