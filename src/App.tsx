import React, { useState } from 'react'
import 'twin.macro'

import DocumentCard from './DocumentCard'
import { GlobalDBDocumentInfo } from './types'

const documentInfo: GlobalDBDocumentInfo = {
  id: 123,
  ss_file_id: '887aa200-ed99-4f2b-9ead-50275f86d968',
  fhash: 'b6697ae5f4b2447385a1d817e3211a7b',
  fpath: '/example-pdf.pdf',
}

function App() {
  return (
    <div tw="[max-width:900px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <DocumentCard documentInfo={documentInfo} />
    </div>
  )
}

export default App
