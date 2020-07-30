import { Injectable } from '@nestjs/common';

@Injectable()
export class IdentityService {

  generateId() {
    const seed = new Date().getTime()
    return `gen-${seed}`
  }

}
