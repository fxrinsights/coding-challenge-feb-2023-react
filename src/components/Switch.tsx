// @ts-nocheck
import React from 'react'
import tw, { theme, styled } from 'twin.macro'

const variant2params = {
  default: {
    switchWidth: 36,
    switchHeight: 20,
    dotSize: 16,
  },
  small: {
    switchWidth: 24,
    switchHeight: 12,
    dotSize: 10,
  },
}
Object.keys(variant2params).forEach((variant) => {
  const params = variant2params[variant]
  params.dotMargin = 0.5 * (params.switchHeight - params.dotSize)
})

const Input = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  display: none;
`

const Label = styled.label`
  & {
    cursor: pointer;
    /*     text-indent: -9999px; */
    width: ${(props) => props.switchWidth}px;
    height: ${(props) => props.switchHeight}px;
    background: grey;
    display: block;
    border-radius: 9999px;
    position: relative;
  }

  &:after {
    content: '';
    position: absolute;
    top: ${(props) => props.dotMargin}px;
    left: ${(props) => props.dotMargin}px;
    width: ${(props) => props.dotSize}px;
    height: ${(props) => props.dotSize}px;
    background: #fff;
    border-radius: 99999px;
    transition: 0.3s;
  }

  input:checked + & {
    background: ${theme('colors.brand.dark')};
  }

  input:checked + &:after {
    left: calc(100% - ${(props) => props.dotMargin}px);
    transform: translateX(-100%);
  }

  &:active:after {
    width: ${(props) => props.dotSize * 1.33}px;
  }
`

interface Props {
  name: string
  checked: boolean
  onChange: (checked: boolean) => void
  variant?: 'default' | 'small'
}

const Switch = ({
  name,
  value = null,
  checked = null,
  onChange,
  variant = 'default',
}: Props) => (
  <div>
    <Input
      type="checkbox"
      name={name}
      id={name}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <Label htmlFor={name} {...variant2params[variant]}></Label>
  </div>
)

export default Switch
