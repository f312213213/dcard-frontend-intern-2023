import { APP_HYDRATE } from '@/features/reducer'
import { IState } from './interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IState = {
  task: [],
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
      const { userData } = action.payload
      state.task = userData
    },
  },
  extraReducers: (builder) => {
    builder.addCase(APP_HYDRATE, (state, action) => ({
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
