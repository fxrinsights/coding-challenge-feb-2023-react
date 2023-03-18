import { useState, useEffect } from 'react'

import { PdfObject } from '../../types'
import pageIndex2mockPdfPageObjects from './mockPdfPageObjects.json'

type DocumentRawContentQueryResult = {
  data: any
  isFetching: boolean
}

export const useFetchDocumentRawContentQuery = ({
  fpath,
}: {
  fpath: string
}): DocumentRawContentQueryResult => {
  // mock query, fetch /example-pdf.pdf and return it.
  const [data, setData] = useState<any>(null)
  const [isFetching, setIsFetching] = useState(true)
  useEffect(() => {
    fetch(fpath)
      .then((response) => response.blob())
      .then((blob) => {
        setData(blob)
        setIsFetching(false)
      })
  }, [])

  return { data, isFetching }
}

type PdfPageObjectsQueryResult = {
  data: PdfObject[]
  isFetching: boolean
}

export const useFetchPdfPageObjectsQuery = ({
  pageIndex,
}: {
  pageIndex: number
}): PdfPageObjectsQueryResult => {
  return {
    data: (pageIndex2mockPdfPageObjects as any)[pageIndex.toString()],
    isFetching: false,
  }
}
