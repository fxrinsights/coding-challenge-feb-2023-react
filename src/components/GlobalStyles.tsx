// @ts-nocheck
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

import './index.css'

export const CustomStyles = createGlobalStyle`
  * {
    overscroll-behavior-x: none;
  }

  html, body {
    ${tw`antialiased bg-gray-100`}
    -webkit-tap-highlight-color: ${theme`colors.brand.DEFAULT`};
  }

  #root {
    ${tw`font-sans`}
  }

  h1, h2, h3, h4, h5 {
    ${tw`font-header`}
  }

  .sortable-helper {
    z-index: 10001;
  }

  .confirm-box {
    z-index: 4000;
  }
`

const GlobalStyles = () => (
  <div>
    <BaseStyles />
    <CustomStyles />
  </div>
)

export default GlobalStyles
