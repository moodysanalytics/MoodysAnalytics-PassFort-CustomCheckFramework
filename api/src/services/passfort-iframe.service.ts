import { Injectable } from '@nestjs/common';

@Injectable()
export class PassFortIFrameService {
  retrieveCheckData(bvdId: number): string {
    return `Message recieved from backend for bvdId: ${bvdId}`;
  }
}
