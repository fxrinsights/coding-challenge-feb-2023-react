// @ts-nocheck
import React from 'react'
import tw, { styled } from 'twin.macro'

export const IconButton = styled.button.attrs((props) => ({
  type: 'button',
  ...props,
}))(({ disabled }) => [
  tw`
  cursor-pointer rounded-full border h-6 w-6
  bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-900

  flex items-center justify-center

  hocus:(bg-gray-100 dark:bg-gray-600)
  `,
  disabled && tw`text-gray-300 cursor-not-allowed`,
])

export const IconButtonConcealed = styled(IconButton)(({ disabled }) => [
  tw`
    bg-transparent border-none
  `,
  !disabled && tw`hocus:(bg-gray-300)`,
])
