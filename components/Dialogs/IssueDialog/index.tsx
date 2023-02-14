import { Portal, Root } from '@radix-ui/react-dialog'

import {
  StyledDialogContent,
  StyledDialogDescription,
  StyledDialogOverlay,
  StyledDialogTitle
} from '@/components/Dialogs/LoginDialog/styles'
import { closeBackdrop, openBackdrop } from '@/features/app/slice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { usernameSelector } from '@/features/user/selector'
import Head from 'next/head'
import apiRequest from '@/apis/apiClient'
import useIsMounted from '@/hooks/useIsMounted'

const IssueDialog = () => {
  const router = useRouter()
  const isMounted = useIsMounted()
  const username = useAppSelector(usernameSelector)
  const [issueData, setIssueData] = useState<any>(undefined)
  const dispatch = useAppDispatch()

  const { projectModalId: repo, issueModalNumber: issueNumber } = router.query

  const getIssueData = async () => {
    dispatch(openBackdrop())
    const { data, success } = await apiRequest({
      endpoint: `${process.env.NEXT_PUBLIC_GITHUB_API_BASE}/repos/${username}/${repo}/issues/${issueNumber}`,
    })
    if (success) {
      setIssueData(data)
    }
    dispatch(closeBackdrop())
  }
  useEffect(() => {
    if (!isMounted) return
    getIssueData()
  }, [isMounted])
  return (
    <Root open>
      <Portal>
        <StyledDialogOverlay onClick={() => router.back()} />
        <StyledDialogContent >
          {
            issueData && (
              <>
                <Head>
                  <title>
                    {`${issueData.title} - Github Task Tracker`}
                  </title>
                </Head>
                <StyledDialogTitle>
                  {issueData.title}
                </StyledDialogTitle>
                <StyledDialogDescription>
                  <a href={issueData.html_url} target={'_blank'} rel={'noreferrer'}>
                    前往 Issue
                  </a>
                </StyledDialogDescription>
              </>
            )
          }
        </StyledDialogContent>
      </Portal>
    </Root>
  )
}

export default IssueDialog
