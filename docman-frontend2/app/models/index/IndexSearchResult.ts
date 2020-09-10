export class IndexSearchResult {
  id: string
  path: string
  title: string
  body: string
  constructor(id: string, path: string, title: string, body: string) {
    this.id = id
    this.path = path
    this.title = title
    this.body = body
  }
}
