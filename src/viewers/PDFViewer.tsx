import React, { useState } from 'react'
import tw from 'twin.macro'
import { useLocalstorageState } from 'rooks'
import ParentSize from '@visx/responsive/lib/components/ParentSize'

import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

import Paginator from './Paginator'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`
const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
  /* standardFontDataUrl: 'standard_fonts/', */
}

const Div = tw.div`relative w-full`
const PaginatorDiv = tw.div`flex justify-between border-t py-1 px-2`

interface Props {
  content: any
}

const PDFViewer = ({ content }: Props) => {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setPageNumber(0)
  }

  return (
    <Div>
      <PaginatorDiv>
        <Paginator
          index={pageNumber}
          count={numPages}
          setIndex={setPageNumber}
        />
      </PaginatorDiv>

      <ParentSize>
        {({ width }) => (
          <div tw="relative">
            <Document
              renderMode="svg"
              file={content}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              <Page pageNumber={pageNumber + 1} width={width} />
            </Document>
          </div>
        )}
      </ParentSize>

      <PaginatorDiv>
        <Paginator
          index={pageNumber}
          count={numPages}
          setIndex={setPageNumber}
        />
      </PaginatorDiv>
    </Div>
  )
}

export default PDFViewer
