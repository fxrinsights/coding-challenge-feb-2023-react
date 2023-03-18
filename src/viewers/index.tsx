// @ts-nocheck
import React from 'react'
import PDFViewer from './PDFViewer'

export const viewers = {
  pdf: PDFViewer,
  /* csv: CSVViewer,
   * xlsx: XLSXViewer,
   * xls: XLSXViewer,
   * tab: CSVViewer, */
}

export const Viewer = ({ extension, ...viewerProps }) => {
  const Component = viewers?.[extension.toLowerCase()]

  if (!Component) {
    return null
  }

  return <Component {...viewerProps} />
}
