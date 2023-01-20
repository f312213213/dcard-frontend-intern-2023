import { FallbackProps } from 'react-error-boundary'

import { EToastType } from '@/features/app/interface'
import { ToastRoot } from '@/components/Toast/index'

const ErrorBoundaryToast = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <ToastRoot
      open={!!error}
      title={'發生無法預期的錯誤！'}
      type={EToastType.ERROR}
      onOpenChange={resetErrorBoundary}
    />
  )
}

export default ErrorBoundaryToast
