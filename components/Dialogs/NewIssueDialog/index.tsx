import { Portal, Root } from '@radix-ui/react-dialog'

import { EDialogType, EToastType } from '@/features/app/interface'
import { EIssueStatus, statusOptions } from '@/constants/issueLabel'
import { FormEvent, useEffect, useState } from 'react'
import { StyledButton, StyledDialogContent, StyledDialogDescription, StyledSelect } from './styles'
import { StyledDialogOverlay, StyledDialogTitle } from '@/components/Dialogs/LoginDialog/styles'
import { StyledIssueStatusSelect } from '@/containers/IssueTable/styles'
import { StyledSeparator } from '@/containers/Sidebar/styles'
import { closeBackdrop, closeDialog, closeToast, openBackdrop, openToast } from '@/features/app/slice'
import { insertNewProjectTaskData } from '@/features/repo/slice'
import { renderBackground, renderColor } from '@/utilis/issueStatus'
import { repoDataSelector } from '@/features/repo/selector'
import { useAppDispatch, useAppSelector } from '@/features/store'
import Head from 'next/head'
import TextArea from '@atlaskit/textarea'
import TextField from '@atlaskit/textfield'
import apiRequest, { EApiMethod } from '@/apis/apiClient'
import set from 'lodash/set'
import useIsMobile from '@/hooks/useIsMobile'
import useIsMounted from '@/hooks/useIsMounted'

const NewIssueDialog = () => {
  const isMounted = useIsMounted()
  const isMobile = useIsMobile()
  const [inputState, setInputState] = useState<any>({
    status: EIssueStatus.OPEN,
  })
  const dispatch = useAppDispatch()
  const reposData = useAppSelector(repoDataSelector)

  const [status, setStatus] = useState<any>(EIssueStatus.OPEN)

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
    dispatch(closeToast())
  }

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!inputState.repo) {
      dispatch(openToast({
        type: EToastType.ERROR,
        title: 'Please select one repo.',
      }))
      return
    }

    if (!inputState.title) {
      dispatch(openToast({
        type: EToastType.ERROR,
        title: 'Please enter your title.',
      }))
      return
    }

    if (inputState.body.length < 30) {
      dispatch(openToast({
        type: EToastType.ERROR,
        title: 'Please enter more than 30 characters.',
      }))
      return
    }

    dispatch(openBackdrop())
    const { data, success } = await apiRequest({
      endpoint: `/repos/${inputState.repo}/issues`,
      method: EApiMethod.POST,
      data: {
        title: inputState.title,
        body: inputState.body,
        labels: [(inputState.status || EIssueStatus.OPEN)],
      },
    })
    if (success) {
      // dispatch(insertNewProjectTaskData({
      //   projectName: inputState.repo.split('/')[1],
      //   issueData: {
      //     title: inputState.title,
      //     body: inputState.body,
      //     status: inputState.status,
      //     repoName: inputState.repo.split('/')[1],
      //     repoOwner: inputState.repo.split('/')[1],
      //     url: data.html_url,
      //     id: data.node_id,
      //     number: data.number,
      //   },
      // }))
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
      <Head>
        <title>
          Create New Issue - Github Task Tracker
        </title>
      </Head>
      <Portal>
        <StyledDialogOverlay onClick={closeCreatDialog} />
        <StyledDialogContent isMobile={isMobile}>

          <StyledDialogTitle>
            Create New Issue
          </StyledDialogTitle>
          <StyledSeparator />
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
          <StyledSeparator />
          <form
            onSubmit={submitHandler}
            onChange={onFormChangeHandler}
          >

            <TextField
              name={'title'}
              isRequired
              defaultValue={inputState.title}
              placeholder={'Title'}
            />

            <StyledSeparator />

            <TextArea
              onBlur={() => {
                if (inputState?.body?.length < 30) {
                  dispatch(openToast({
                    type: EToastType.ERROR,
                    title: 'Please enter more than 30 characters.',
                  }))
                }
              }}
              name={'body'}
              rows={20}
              minLength={30}
              defaultValue={inputState.body}
              placeholder={'Body \nPlease enter more than 30 characters.'}
            />

            <div style={{
              marginTop: '15px',
              height: '40px',
            }}>
              <StyledIssueStatusSelect
                value={status}
                defaultValue={status || EIssueStatus.OPEN}
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
