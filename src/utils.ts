import { PdfObject } from './types'

export const getObjectComparison = (
  object: PdfObject,
  originalObject: PdfObject
) => {
  return {
    rel_bbox: object.attributes.bbox.map(
      (v, i) => v - originalObject.attributes.bbox[i]
    ),
  }
}

export const getObjectsTouchingEdgesOfSharedBbox = (objects: PdfObject[]) => {
  // each object has a bbox: object.attributes.bbox.
  // we want to compute the total bbox (containing all the objects), and then
  // return a dictionary mapping each axis (x0, y0, x1, y1) to the object which is
  // touching the border of the total bbox for that axis.
  const sharedBbox = objects.reduce(
    (acc, object) => {
      const bbox = object.attributes.bbox
      return [
        Math.min(acc[0], bbox[0]),
        Math.min(acc[1], bbox[1]),
        Math.max(acc[2], bbox[2]),
        Math.max(acc[3], bbox[3]),
      ]
    },
    [Infinity, Infinity, -Infinity, -Infinity]
  )
  const axes = ['x0', 'y0', 'x1', 'y1']
  const ax2touchingObject = axes.reduce((acc: any, axis: string, i: number) => {
    const axisValue = sharedBbox[i]
    const touchingObjects = objects.filter(
      (object) => object.attributes.bbox[i] === axisValue
    )
    if (touchingObjects.length > 0) {
      acc[axis] = touchingObjects[0]
    } else {
      acc[axis] = null
    }
    return acc
  }, {})

  return { sharedBbox, ax2touchingObject }
}
