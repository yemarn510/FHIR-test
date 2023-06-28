import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Resource } from './entity/resource.entity';

@Controller(':type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  async searchPatient(
    @Param() params: { uuid: string },
    @Query() query: any
  ): Promise<Resource | null> {
    return this.appService.searchPatient(query);
    // return 'ok';
    // return await this.appService.getPatient(params.uuid);
  }

  @Get(':uuid')
  async getPatient(
    @Param() params: { type: string, uuid: string },
    @Query() query: any
  ): Promise<Resource | null> {

    if (!params?.uuid) {
      return null;
    }
    return await this.appService.getPatient(params.uuid);
  }

  @Post()
  createPatient(@Body() data: JSON): Promise<JSON> {
    return this.appService.createPatient(data);
  }
}
