import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PassFortIFrameService } from '../services/passfort-iframe.service';
import { AuthTokenGuard } from '../auth/auth-token.guard';

@Controller()
export class PassFortIFrameController {
  constructor(private readonly passfortIFrameService: PassFortIFrameService) {}

  @UseGuards(AuthTokenGuard)
  @Post('retrieveCheckData')
  async retrieveCheckData(@Req() request: any) {
    const bvdId = request.body.id;
    if (process.env.DEBUG === 'true') {
      if (bvdId) {
        return this.passfortIFrameService.retrieveCheckData(bvdId);
      }
    } else {
      if (bvdId === request.token.result_id) {
        return this.passfortIFrameService.retrieveCheckData(bvdId);
      } else {
        throw new BadRequestException();
      }
    }
  }
}
