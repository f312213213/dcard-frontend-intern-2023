import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { Arrow, ItemIndicator, ItemText, Portal, Root, Trigger, Value } from '@radix-ui/react-select'
import { HiOutlineSelector } from 'react-icons/hi'
import {
  StyledSelectContent,
  StyledSelectIcon, StyledSelectItem, StyledSelectScrollDownButton,
  StyledSelectScrollUpButton,
  StyledSelectViewport
} from './styles'

interface IProps {
  value?: string
  defaultValue?: string
  onValueChange: any
  options: {
    id: string
    value: string
    text: string
  }[]
  placeholder?: string
  className?: string
}

const Select = ({
  value,
  defaultValue,
  onValueChange,
  options,
  placeholder,
  className,
}: IProps) => {
  return (
    <Root value={value} defaultValue={defaultValue} onValueChange={onValueChange}>
      <Trigger className={className} >
        <Value placeholder={placeholder} />
        <StyledSelectIcon>
          <HiOutlineSelector />
        </StyledSelectIcon>
      </Trigger>

      <Portal>
        <StyledSelectContent>
          <StyledSelectScrollUpButton>
            <AiOutlineUp />
          </StyledSelectScrollUpButton>
          <StyledSelectViewport>
            {
              options.map((option) => {
                return (
                  <StyledSelectItem key={option.id} value={option.value}>
                    <ItemText>
                      {option.text}
                    </ItemText>
                    <ItemIndicator />
                  </StyledSelectItem>
                )
              })
            }
          </StyledSelectViewport>
          <StyledSelectScrollDownButton>
            <AiOutlineDown />
          </StyledSelectScrollDownButton>
          <Arrow />
        </StyledSelectContent>
      </Portal>
    </Root>
  )
}

export default Select
