import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { INode } from '~/node/node.interface';

export interface IDocument {
  documentId: string
  documentTile: string
  node: INode
  createdAt: string // FIXME Date型は型定義されていない
  updatedAt: string // FIXME Date型は型定義されていない
}
