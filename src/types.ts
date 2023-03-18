export type GlobalDBDocumentInfo = {
  id: number
  ss_file_id: string
  fhash: string
  fpath: string
}

export type PdfObjectType = 'SPAN' | 'LINE' | 'RECT'

export type PdfObject = {
  object_type: PdfObjectType
  attributes: {
    size: number
    flags: number
    font: string
    color: number
    ascender: number
    descender: number
    text: string
    origin: [number, number]
    bbox: [number, number, number, number]
  }
  location_on_page: [number, number, number, number]
}
