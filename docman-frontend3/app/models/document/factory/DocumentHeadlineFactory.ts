import { DocumentHeadline } from '~/models/document/DocumentHeadline'

const tagToNumber = new Map<String, number>([
  ['h1', 1],
  ['h2', 2],
  ['h3', 3],
  ['h4', 4],
  ['h5', 5],
  ['h6', 6]
])

const headlineToNumber = (tagName: String): number => {
  const tagNumber = tagToNumber.get(tagName.toLowerCase())
  return tagNumber || 6
}

export function createDocumentHeadline(element: HTMLElement): DocumentHeadline {
  return new DocumentHeadline(
    headlineToNumber(element.tagName),
    element.id,
    element.textContent || '(no name)'
  )
}
