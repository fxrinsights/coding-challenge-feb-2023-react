import React, { useState } from 'react'
import tw, { theme } from 'twin.macro'

import type { PdfObject, PdfObjectType } from '../types'

import { H4, PLight } from '../components'
import { Card } from '../components'

const objectType2color: { [key in PdfObjectType]: string } = {
  SPAN: theme`colors.yellow.500`,
  LINE: theme`colors.purple.500`,
  RECT: theme`colors.green.500`,
}
const selectionColor = theme`colors.pink.600`
const activeColor = theme`colors.blue.400`

const PdfObjectBox = ({
  object,
  onClick,
  onMouseOver,
  onMouseOut,
  isSelected,
  isActive,
}: {
  object: PdfObject
  onClick: any
  onMouseOver: any
  onMouseOut: any
  isSelected: boolean
  isActive: boolean
}) => {
  const [x0, y0, x1, y1] = object.location_on_page
  const objWidth = Math.max(0.001, x1 - x0)
  const objHeight = Math.max(0.001, y1 - y0)

  const color = isActive
    ? activeColor
    : isSelected
    ? selectionColor
    : objectType2color[object.object_type] || ''

  return (
    <div
      tw="absolute border cursor-pointer"
      style={{
        left: `${x0 * 100}%`,
        top: `${y0 * 100}%`,
        width: `${objWidth * 100}%`,
        height: `${objHeight * 100}%`,
        borderColor: color,
        backgroundColor: `${color}40`,
      }}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  )
}

const getObjectComparison = (object: PdfObject, originalObject: PdfObject) => {
  return {
    rel_bbox: object.attributes.bbox.map(
      (v, i) => v - originalObject.attributes.bbox[i]
    ),
  }
}

const PdfObjectDescriptionCard = ({
  object,
  selectedObject = null,
}: {
  object: PdfObject
  selectedObject?: PdfObject | null
}) => {
  const attributesString = JSON.stringify(object.attributes, null, 2)

  const color = objectType2color[object.object_type] || ''

  return (
    <Card tw="shadow">
      <Card.Body>
        <H4 tw="mb-1">
          attributes of <span style={{ color }}>{object.object_type}</span>
        </H4>

        <div
          tw="p-3 bg-gray-100 rounded dark:bg-gray-900 w-96 border"
          style={{ borderColor: color }}
        >
          <p tw="text-xs text-gray-700 dark:text-gray-300 overflow-hidden overflow-ellipsis">
            <pre>{attributesString}</pre>
          </p>
        </div>
      </Card.Body>
      {selectedObject && (
        <Card.Body>
          <H4>
            in comparison to selected{' '}
            <span
              style={{
                color: objectType2color[selectedObject.object_type] || '',
              }}
            >
              {selectedObject.object_type}
            </span>
          </H4>

          <div
            tw="p-3 bg-gray-100 rounded dark:bg-gray-900 w-96 border"
            style={{ borderColor: selectionColor }}
          >
            <p tw="text-xs text-gray-700 dark:text-gray-300 overflow-hidden overflow-ellipsis">
              <pre>
                {JSON.stringify(
                  getObjectComparison(object, selectedObject),
                  null,
                  2
                )}
              </pre>
            </p>
          </div>
        </Card.Body>
      )}
    </Card>
  )
}

interface Props {
  useGetObjects: () => { objects: PdfObject[] }
  width: number
  height: number
}

const PdfObjectsOverlay = ({ useGetObjects, width, height }: Props) => {
  const [activeObjectIndex, setActiveObjectIndex] = useState<number | null>(
    null
  )
  const [selectedObjectIndex, setSelectedObjectIndex] = useState<number | null>(
    null
  )

  const { objects } = useGetObjects()

  if (!objects) {
    return null
  }

  const copyToClipboard = (text: string, name: string) => {
    console.log({ text, name })
    /* toast.promise(navigator.clipboard.writeText(text), {
     *   loading: 'copying...',
     *   success: `copied ${name} to clipboard.`,
     *   error: 'could not copy.',
     * }) */
  }

  return (
    <>
      <div tw="absolute top-0 left-0 z-10" style={{ width, height }}>
        {objects.map((object, index) => {
          const onClick = (ev: React.MouseEvent<HTMLDivElement>) => {
            if (ev.shiftKey) {
              if (index === selectedObjectIndex) {
                setSelectedObjectIndex(null)
              } else {
                setSelectedObjectIndex(index)
              }
              return
            }

            if (
              selectedObjectIndex !== null &&
              selectedObjectIndex !== index &&
              objects.length > selectedObjectIndex
            ) {
              const comparisonString = JSON.stringify(
                getObjectComparison(object, objects[selectedObjectIndex]),
                null,
                2
              )
              copyToClipboard(comparisonString, 'comparison')
            } else {
              const attributesString = JSON.stringify(
                object.attributes,
                null,
                2
              )
              copyToClipboard(attributesString, 'attributes')
            }
          }

          const onMouseOver = () => setActiveObjectIndex(index)
          const onMouseOut = () => setActiveObjectIndex(null)

          return (
            <PdfObjectBox
              key={index}
              isSelected={index === selectedObjectIndex}
              isActive={index === activeObjectIndex}
              object={object}
              onClick={onClick}
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
            />
          )
        })}
      </div>
      {activeObjectIndex !== null && (
        <div tw="fixed left-8 bottom-8">
          <PdfObjectDescriptionCard
            object={objects[activeObjectIndex]}
            selectedObject={
              selectedObjectIndex !== null &&
              activeObjectIndex !== selectedObjectIndex
                ? objects[selectedObjectIndex]
                : null
            }
          />
        </div>
      )}
    </>
  )
}

export default PdfObjectsOverlay
