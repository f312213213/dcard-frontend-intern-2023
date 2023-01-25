import { FallbackProps } from 'react-error-boundary'

import { EToastType } from '@/features/app/interface'
import Toast from '@/components/Toast'

const ErrorBoundaryToast = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Toast
      open={!!error}
      title={'發生無法預期的錯誤！'}
      type={EToastType.ERROR}
      onOpenChange={resetErrorBoundary}
    />
  )
}

export default ErrorBoundaryToast
