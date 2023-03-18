// @ts-nocheck
import React from 'react'
import tw, { styled } from 'twin.macro'

const CardBase = styled.div({
  '> div': tw`border-b border-gray-300 dark:border-gray-900`,
  '> div:first-of-type': tw`rounded-t-lg`,
  '> div:last-of-type': tw`border-b-0 rounded-b-lg`,
})

const Card = styled(CardBase)({
  ...tw`
  bg-white dark:bg-gray-700
  text-black dark:text-white
  rounded-lg
  border
  border-gray-300 dark:border-gray-900
  `,
})

export const CardHeader = tw.div`
  px-5 py-2
`

export const CardBody = tw.div`
  px-5 py-3
`

export const CardSection = tw.div`
  px-5 py-1
`

export const CardInfo = tw.div`
  pl-3 pr-5 py-2
  flex items-center
  text-xs
  text-blue-800 bg-blue-100
  ring-1 ring-blue-400 border-b-0!
`

export const CardNotice = tw.div`
  pl-3 pr-5 py-2
  flex items-center
  text-xs
  text-yellow-800 bg-yellow-100
  ring-1 ring-yellow-400 border-b-0!
`

export const CardWarning = tw.div`
  pl-3 pr-5 py-2
  flex items-center
  text-xs
  font-bold text-red-800 bg-red-100
  ring-1 ring-red-400 border-b-0!
`

const Dot = tw.div`
  absolute p-1 w-6 h-6 rounded-full! bg-white dark:bg-gray-700
  border border-gray-300 dark:border-gray-900 flex items-center justify-center
`

export const CardDot = ({ children, top = true, left = true }) => (
  <Dot
    css={[top ? tw`-top-3` : `-bottom-3`, left ? tw`-left-3` : tw`-right-3`]}
  >
    <Text as="p" tw="inline-block text-xs">
      {children}
    </Text>
  </Dot>
)

const CardTab = styled.div(() => ({
  ...tw`inline-block px-6 py-2 cursor-pointer
     bg-white hover:bg-gray-100
     dark:(bg-gray-700 hover:bg-gray-600 text-white)
  `,
  '&.active': tw`
   cursor-default
   ring-1 ring-brand-darker bg-brand-dark text-white
   dark:(ring-brand-darker! bg-brand-dark! text-white!)
   hover:bg-brand-dark dark:hover:bg-brand-dark
  `,
}))

const CardTabContainer = styled.div(() => ({
  ...tw`space-x-px bg-gray-200 dark:bg-gray-800 overflow-hidden`,
}))

const CardTabs = ({ tabs, activeTab, onSetActiveTab }) => (
  <CardTabContainer>
    {tabs.map((tab, i) => (
      <CardTab
        key={i}
        onClick={() => onSetActiveTab(tab)}
        active={activeTab === tab}
        className={activeTab === tab ? 'active' : ''}
      >
        {tab}
      </CardTab>
    ))}
  </CardTabContainer>
)

Card.Body = CardBody
Card.Header = CardHeader
Card.Section = CardSection
Card.Notice = CardNotice
Card.Warning = CardWarning
Card.Info = CardInfo
Card.Dot = CardDot
Card.Concealed = CardBase
Card.Tab = CardTab
Card.TabContainer = CardTabContainer
Card.Tabs = CardTabs

type CardComponent = typeof Card & {
  Body: typeof CardBody
  Header: typeof CardHeader
  Section: typeof CardSection
  Info: typeof CardInfo
  Notice: typeof CardNotice
  Warning: typeof CardWarning
  Dot: typeof CardDot
  Tab: typeof CardTab
  TabContainer: typeof CardTabContainer
  Tabs: typeof CardTabs
}

export default Card as CardComponent
