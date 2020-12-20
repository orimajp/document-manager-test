import { MongoClient, Collection, ObjectID } from 'mongodb';
const MONGODB_URI = 'mongodb://localhost:27017/docman';

// 参考
// https://blog.koh.dev/2019-06-07-mongodb-typescript/

/*export type Document = {
  _id?: ObjectID;
};*/

export type Page = {
  // ページID
  _id?: ObjectID;
  // ドキュメントID
  documentId?: ObjectID;
  // ページタイトル
  pageTitle: string;
  // ページデータ
  pageData: string;
  // 検索データ
  searchData: string;
  // 生成日時
  createdAt: string;
  // 更新日時
  updatedAt?: string;
};

export type Node = {
  // ページID
  _id?: ObjectID;
  // ドキュメントID
  documentId: ObjectID;
  // 親ページID
  parentId: ObjectID;
  // ノードリスト
  nodes: Array<ObjectID>;
};

export type Asset = {
  _id?: ObjectID;
  // documentId: ObjectID; // 元々のAPI的に無理
  fileName: string;
  mimeType: string;
  buffer: Buffer;
};

type Collections = {
  pages: Collection<Page>;
  // document: Collection<Document>;
  nodes: Collection<Node>;
  assets: Collection<Asset>;
};

export const collections: Collections = {
  pages: null,
  // document: null,
  nodes: null,
  assets: null,
};

export async function connectMongoDb() {
  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('docman');

  collections.pages = db.collection<Page>('pages');
  // collections.document = db.collection<Document>('documents');
  collections.nodes = db.collection<Node>('nodes');
  collections.assets = db.collection<Asset>('assets');
}
