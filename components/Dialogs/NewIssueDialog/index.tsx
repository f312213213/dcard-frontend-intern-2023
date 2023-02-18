import { Portal, Root } from '@radix-ui/react-dialog'

import { EDialogType, EToastType } from '@/features/app/interface'
import { FormEvent, useEffect, useState } from 'react'
import { StyledButton, StyledDialogContent, StyledDialogDescription, StyledSelect } from './styles'
import { StyledDialogOverlay, StyledDialogTitle } from '@/components/Dialogs/LoginDialog/styles'
import { StyledIssueStatusSelect } from '@/containers/IssueTable/styles'
import { closeBackdrop, closeDialog, openBackdrop, openToast } from '@/features/app/slice'
import { insertNewProjectTaskData } from '@/features/repo/slice'
import { renderBackground, renderColor } from '@/utilis/issueStatus'
import { repoDataSelector } from '@/features/repo/selector'
import { statusOptions } from '@/constants/issueLabel'
import { useAppDispatch, useAppSelector } from '@/features/store'
import Head from 'next/head'
import TextArea from '@atlaskit/textarea'
import TextField from '@atlaskit/textfield'
import apiRequest, { EApiMethod } from '@/apis/apiClient'
import set from 'lodash/set'
import useIsMounted from '@/hooks/useIsMounted'

const NewIssueDialog = () => {
  const isMounted = useIsMounted()
  const [inputState, setInputState] = useState<any>({})
  const dispatch = useAppDispatch()
  const reposData = useAppSelector(repoDataSelector)

  const [status, setStatus] = useState<any>('')

  const onFormChangeHandler = (event: FormEvent<HTMLFormElement>) => {
    const { name, value } = event.target as HTMLInputElement
    setInputState((draft: any) => set(draft, name, value))
  }

  const onRepoValueChange = (value: string) => {
    setInputState((draft: any) => set(draft, 'repo', value))
  }

  const onStatusValueChange = (value: string) => {
    setInputState((draft: any) => set(draft, 'status', value))
    setStatus(value)
  }

  const closeCreatDialog = () => {
    localStorage.issueDraft = JSON.stringify(inputState)
    dispatch(closeDialog({ type: EDialogType.CREATE }))
  }

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(openBackdrop())
    const { data, success } = await apiRequest({
      endpoint: `/repos/${inputState.repo}/issues`,
      method: EApiMethod.POST,
      data: {
        title: inputState.title,
        body: inputState.body,
        labels: [inputState.status],
      },
    })
    if (success) {
      dispatch(insertNewProjectTaskData({
        projectName: inputState.repo.split('/')[1],
        issueData: {
          title: inputState.title,
          body: inputState.body,
          status: inputState.status,
          repoName: inputState.repo.split('/')[1],
          repoOwner: inputState.repo.split('/')[1],
          url: data.html_url,
          id: data.node_id,
          number: data.number,
        },
      }))
      dispatch(openToast({
        type: EToastType.SUCCESS,
        title: 'Success!',
      }))
      dispatch(closeDialog({ type: EDialogType.CREATE }))
      localStorage.issueDraft = ''
    }
    dispatch(closeBackdrop())
  }

  useEffect(() => {
    const issueDraft = localStorage.issueDraft
    if (issueDraft) {
      const draft = JSON.parse(issueDraft)
      setInputState(draft)
      setStatus(draft.status)
    }
  }, [])

  if (!isMounted) return null

  return (
    <Root open>
      <Portal>
        <StyledDialogOverlay onClick={closeCreatDialog} />
        <StyledDialogContent>
          <Head>
            <title>
              Create New Issue - Github Task Tracker
            </title>
          </Head>
          <StyledSelect
            placeholder={'Select a project'}
            defaultValue={inputState.repo}
            onValueChange={onRepoValueChange}
            options={reposData.map(repo => {
              return {
                id: repo.repoId,
                value: `${repo.repoOwner}/${repo.repoName}`,
                text: repo.repoName,
              }
            })}
          />
          <StyledDialogTitle>
            Create New Issue
          </StyledDialogTitle>
          <form
            onSubmit={submitHandler}
            onChange={onFormChangeHandler}
          >
            <TextField name={'title'} defaultValue={inputState.title} />
            <TextArea name={'body'} defaultValue={inputState.body} />
            <div style={{
              marginTop: '15px',
              height: '40px',
            }}>
              <StyledIssueStatusSelect
                value={status}
                defaultValue={inputState.status}
                options={statusOptions}
                onValueChange={onStatusValueChange}
                background={renderBackground(status)}
                color={renderColor(status)}
              />
            </div>
            <StyledButton type={'submit'}>
              送出
            </StyledButton>
          </form>

          <StyledDialogDescription>

          </StyledDialogDescription>

        </StyledDialogContent>
      </Portal>
    </Root>
  )
}

export default NewIssueDialog
