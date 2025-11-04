import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('api')
  health() {
    return { ok: true };
  }
}

