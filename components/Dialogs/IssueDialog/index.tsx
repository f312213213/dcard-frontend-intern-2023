import { Portal, Root } from '@radix-ui/react-dialog'

import { EInputType } from '@/components/InLineEdit'
import { EIssueStatus, statusOptions } from '@/constants/issueLabel'
import { EPageContentType } from '@/constants/pageContentType'
import { EToastType } from '@/features/app/interface'
import {
  StyledActionArea,
  StyledBodyInLineEdit,
  StyledDeleteButton,
  StyledDialogContent,
  StyledDialogDescription,
  StyledLink,
  StyledTitleInLineEdit
} from '@/components/Dialogs/IssueDialog/styles'
import { StyledDialogOverlay, StyledDialogTitle } from '@/components/Dialogs/LoginDialog/styles'
import { StyledIssueStatusSelect } from '@/containers/IssueTable/styles'
import { StyledSeparator } from '@/containers/Sidebar/styles'
import { deleteIssue, updateIssueStatus } from '@/features/repo/services'
import { issueDataByIdSelector, searchedIssueDataSelector } from '@/features/repo/selector'
import { openToast } from '@/features/app/slice'
import { renderBackground, renderColor } from '@/utilis/issueStatus'
import { updateSearchTaskDataByField, updateTaskDataByField } from '@/features/repo/slice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useRouter } from 'next/router'
import Head from 'next/head'
import apiRequest, { EApiMethod } from '@/apis/apiClient'
import useIsMobile from '@/hooks/useIsMobile'

const IssueDialog = () => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { projectModalId: repoName, issueModalNumber: issueNumber } = router.query

  let issueData = useAppSelector(issueDataByIdSelector(repoName as string, Number(issueNumber)))
  const searchedIssueData = useAppSelector(searchedIssueDataSelector(repoName as string, Number(issueNumber)))

  if (router.pathname === '/') issueData = searchedIssueData

  const dispatch = useAppDispatch()

  const onValueChange = (value: EIssueStatus) => {
    dispatch(updateIssueStatus(
      repoName as string,
      issueData.number,
      value,
      router.pathname === '/' ? EPageContentType.SEARCH_RESULT : EPageContentType.ISSUE_TABLE
    ))
  }

  const onTitleUpdate = async (value: string) => {
    if (router.pathname === '/') {
      dispatch(updateSearchTaskDataByField({
        projectName: repoName,
        issueNumber: issueData.number,
        field: 'title',
        updatedData: value,
      }))
    } else {
      dispatch(updateTaskDataByField({
        projectName: repoName,
        issueNumber: issueData.number,
        field: 'title',
        updatedData: value,
      }))
    }
    await apiRequest({
      endpoint: `/repos/${issueData.repoOwner}/${repoName}/issues/${issueNumber}`,
      method: EApiMethod.PATCH,
      data: {
        title: value,
      },
    })
  }

  const onBodyUpdate = async (value: string) => {
    if (router.pathname === '/') {
      dispatch(updateSearchTaskDataByField({
        projectName: repoName,
        issueNumber: issueData.number,
        field: 'body',
        updatedData: value,
      }))
    } else {
      dispatch(updateTaskDataByField({
        projectName: repoName,
        issueNumber: issueData.number,
        field: 'body',
        updatedData: value,
      }))
    }
    await apiRequest({
      endpoint: `/repos/${issueData.repoOwner}/${repoName}/issues/${issueNumber}`,
      method: EApiMethod.PATCH,
      data: {
        body: value,
      },
    })
  }

  const onError = (errorMessage: string) => {
    dispatch(openToast({
      type: EToastType.ERROR,
      title: errorMessage,
    }))
  }

  const clickHandler = async () => {
    await dispatch(deleteIssue(
      issueData.repoOwner,
      repoName as string,
      Number(issueNumber as string)
    ))
    router.replace(`/browse/${issueData.repoOwner}/${repoName}`)
  }

  return (
    <Root open>
      <Portal>
        <StyledDialogOverlay onClick={() => router.back()} />
        <StyledDialogContent isMobile={isMobile}>
          {
            issueData && (
              <>
                <Head>
                  <title>
                    {`${issueData.title} - Issue #${issueData.number} - Github Task Tracker`}
                  </title>
                </Head>
                <StyledDialogTitle>
                  #{issueData.number} - {issueData.repoName}
                  <br />
                  <div
                    style={{
                      transform: 'translateY(20px)',
                    }}
                  >
                    <StyledTitleInLineEdit
                      name={'title'}
                      type={EInputType.TEXT}
                      onConfirm={onTitleUpdate}
                      defaultValue={issueData.title}
                      value={issueData.title}
                      required
                      onError={onError}
                      readViewFitContainerWidth
                    />
                  </div>
                </StyledDialogTitle>

                <StyledSeparator />

                <div style={{
                  marginTop: '15px',
                  height: '40px',
                }}>
                  <StyledIssueStatusSelect
                    value={issueData.status}
                    defaultValue={issueData.status}
                    options={statusOptions}
                    onValueChange={onValueChange}
                    background={renderBackground(issueData.status)}
                    color={renderColor(issueData.status)}
                  />
                </div>

                <StyledDialogDescription>
                  <StyledBodyInLineEdit
                    name={'body'}
                    type={EInputType.TEXTAREA}
                    onConfirm={onBodyUpdate}
                    defaultValue={issueData.body}
                    value={issueData.body || "This issue doesn't have a body."}
                    minLength={30}
                    onError={onError}
                    keepEditViewOpenOnBlur
                    readViewFitContainerWidth
                  />
                </StyledDialogDescription>

                <StyledActionArea>
                  <StyledDeleteButton onClick={clickHandler}>
                    刪除此 issue
                  </StyledDeleteButton>
                  <StyledLink href={issueData.url} target={'_blank'} rel={'noreferrer'}>
                    前往 Issue
                  </StyledLink>
                </StyledActionArea>
              </>
            )
          }
        </StyledDialogContent>
      </Portal>
    </Root>
  )
}

export default IssueDialog
