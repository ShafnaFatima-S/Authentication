import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IAuth } from './auth.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Post('createUser')
  create_Auth(@Body() createUser:IAuth){
    return this.appService.createUser(createUser);
  }
  @Get('checkUser/:id')
  check_Auth(@Param() params:{id:string},@Body() data:IAuth){
    return this.appService.checkUser(params.id,data)
  }
  @Delete('del/:id')
  async DeleteNote(@Param() params:{id: string} ){
    return this.appService.deleteUser(params.id)
  }
}
