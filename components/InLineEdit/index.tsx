import { is } from '@babel/types'
import { useEffect, useState } from 'react'
import Edit from '@atlaskit/inline-edit'
import TextArea from '@atlaskit/textarea'
import TextField from '@atlaskit/textfield'

export enum EInputType {
  TEXT,
  TEXTAREA,
}

interface IProps {
  defaultValue?: string
  onConfirm: any
  type: EInputType
  name: string
  rows?: number
  value?: string
  className?: string
  required?: boolean
  minLength?: number
  onError?: any
  keepEditViewOpenOnBlur?: boolean
  readViewFitContainerWidth?: boolean
}

const InLineEdit = ({
  defaultValue,
  onConfirm,
  type,
  value,
  name,
  className,
  onError,
  rows = 30,
  minLength = 0,
  readViewFitContainerWidth = false,
  keepEditViewOpenOnBlur = false,
}: IProps) => {
  let validateValue = ''
  let validateTimeoutId: number | undefined
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    return () => {
      if (validateTimeoutId) {
        window.clearTimeout(validateTimeoutId)
      }
    }
  })

  const validate = (value: string) => {
    validateValue = value
    return new Promise<{ value: string; error: string } | undefined>(
      (resolve) => {
        validateTimeoutId = window.setTimeout(() => {
          if ((value?.length || 0) <= minLength) {
            setIsError(true)
            const errorMessage = `Must longer than ${minLength} characters.`
            resolve({
              value,
              error: errorMessage,
            })
          }
          setIsError(false)
          resolve(undefined)
        }, 100)
      }
    ).then((validateObject) => {
      if (validateObject && validateObject.value === validateValue) {
        return validateObject.error
      }
      return undefined
    })
  }

  return (
    <Edit
      onConfirm={(value, analyticsEvent) => {
        if (isError) return onError(validateValue)
        onConfirm(value, analyticsEvent)
      }}
      defaultValue={defaultValue}
      validate={validate}
      readViewFitContainerWidth={readViewFitContainerWidth}
      keepEditViewOpenOnBlur={keepEditViewOpenOnBlur}
      editView={
        ({ errorMessage, ...fieldProps }, ref) => {
          return (
            type === EInputType.TEXTAREA
              ? (
                // @ts-ignore - textarea does not pass through ref as a prop
                <TextArea
                  {...fieldProps}
                  className={className}
                  rows={rows}
                  ref={ref}
                  maxHeight={'40vh'}
                  name={name}
                  onBlur={() => {
                    if (errorMessage) onError(errorMessage)
                  }}
                />
                )
              : (
                <TextField {...fieldProps} name={name} autoFocus={false} isRequired className={className}/>
                )
          )
        }
      }
      readView={() => {
        return (
          <div className={className}>
            {value}
          </div>
        )
      }}
    />
  )
}

export default InLineEdit
