import { RootState } from '@/features/store'

export const selectedProjectSelector = (state: RootState) => state.task.selectedProject

export const selectedProjectTasksSelector = (state: RootState) => state.task.tasks
