import React from 'react'
import 'twin.macro'
import {
  CgChevronRight,
  CgPushChevronRight,
  CgChevronLeft,
  CgPushChevronLeft,
} from 'react-icons/cg'

import { IconButtonConcealed } from '../components'

interface Props {
  index: number
  count: number
  setIndex: (index: number) => void
}

const Paginator = ({ index, count, setIndex }: Props) => {
  const canPreviousPage = index !== 0
  const canNextPage = index !== count - 1
  const gotoPage = (index: number) =>
    setIndex(Math.max(Math.min(index, count - 1), 0))
  const nextPage = () => setIndex(index + 1)
  const previousPage = () => setIndex(index - 1)

  return (
    <div tw="flex items-center">
      <IconButtonConcealed
        tw="mr-2"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        <CgPushChevronLeft />
      </IconButtonConcealed>
      <IconButtonConcealed
        tw="mr-2"
        onClick={previousPage}
        disabled={!canPreviousPage}
      >
        <CgChevronLeft />
      </IconButtonConcealed>

      <p tw="w-10 text-center">
        {index + 1}/{count}
      </p>

      <IconButtonConcealed tw="ml-2" onClick={nextPage} disabled={!canNextPage}>
        <CgChevronRight />
      </IconButtonConcealed>
      <IconButtonConcealed
        tw="ml-2"
        onClick={() => gotoPage(count - 1)}
        disabled={!canNextPage}
      >
        <CgPushChevronRight />
      </IconButtonConcealed>
    </div>
  )
}

export default Paginator
