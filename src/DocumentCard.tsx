import React from 'react'
import 'twin.macro'

import { Card, H4 } from './components'
import { GlobalDBDocumentInfo } from './types'
import DocumentRawContent from './DocumentRawContent'

export interface Props {
  documentInfo: GlobalDBDocumentInfo
}

const DocumentCard = ({ documentInfo }: Props) => {
  const fname = documentInfo.fpath.split('/').pop()
  return (
    <Card>
      <Card.Section>
        <div tw="flex items-center">
          <H4>{fname}</H4>
        </div>
      </Card.Section>

      <DocumentRawContent documentInfo={documentInfo} />
    </Card>
  )
}
export default DocumentCard
