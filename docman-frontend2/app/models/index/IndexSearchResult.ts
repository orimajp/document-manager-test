export class IndexSearchResult {
  path: string
  title: string
  body: string
  constructor(path: string, title: string, body: string) {
    this.path = path
    this.title = title
    this.body = body
  }
}
