import { Injectable } from '@nestjs/common'
import { IDocumentList } from '~/document/document-list.interface'
import { DocumentList } from '~/document/document-list'
import * as dayjs from 'dayjs'
import 'dayjs/locale/ja'

@Injectable()
export class DocumentService {

  getDocumentList(): Array<IDocumentList> {
    const document1 = new DocumentList("a", "ドキュメント1", dayjs().format(), dayjs().format())
    const documentList = [] as Array<IDocumentList>
    documentList.push(document1)
    return documentList
  }

}
