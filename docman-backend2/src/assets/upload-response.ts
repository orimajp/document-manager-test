export class UploadResponse {
  fileName: string;
  location: string;
  constructor(fileName: string, location: string) {
    this.fileName = fileName;
    this.location = location;
  }
}
