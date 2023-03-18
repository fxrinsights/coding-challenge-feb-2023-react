import React from 'react'
import 'twin.macro'

import { Viewer } from './viewers'
import { GlobalDBDocumentInfo } from './types'

import {
  useFetchDocumentRawContentQuery,
  useFetchPdfPageObjectsQuery,
} from './features/api/apiSlice'

interface Props {
  documentInfo: GlobalDBDocumentInfo
}

const DocumentRawContent = ({ documentInfo }: Props) => {
  const { data: content, isFetching } = useFetchDocumentRawContentQuery({
    fpath: documentInfo.fpath,
  })

  const fname = documentInfo.fpath.split('/').pop()
  const extension = fname?.split('.').pop()

  let viewerProps: any = {}

  const useGetObjects = ({ pageIndex }: { pageIndex: number }) => {
    const { data = null, isFetching } = useFetchPdfPageObjectsQuery({
      pageIndex,
    })

    const objects = isFetching ? null : data?.objects || null
    return { objects }
  }

  if (extension === 'pdf') {
    viewerProps = {
      ...viewerProps,
      useGetObjects,
    }
  }

  return (
    <div>
      {isFetching ? (
        <p>loading...</p>
      ) : (
        <Viewer
          content={content}
          fname={fname}
          extension={extension}
          {...viewerProps}
        />
      )}
    </div>
  )
}

export default DocumentRawContent
