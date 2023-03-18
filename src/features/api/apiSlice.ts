import { useState, useEffect } from 'react'

import pageIndex2mockPdfPageObjects from './mockPdfPageObjects.json'

export const useFetchDocumentRawContentQuery = ({
  fpath,
}: {
  fpath: string
}) => {
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

export const useFetchPdfPageObjectsQuery = ({
  pageIndex,
}: {
  pageIndex: number
}) => {
  return {
    data: (pageIndex2mockPdfPageObjects as any)[pageIndex.toString()],
    isFetching: false,
  }
}
