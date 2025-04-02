import { Body, Controller, Delete, Get, Header, Headers, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { IAuth } from './auth.interface';
import { AuthGuard } from '@nestjs/passport';

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
  @Get('checkUser/')
  check_Auth(@Body() data:any){
    return this.appService.checkUser(data)
  }
  @Get('allUser')
  all_User(){
    return this.appService.allUser()
  }
  @Put('updateUser/:id')
  update_User(@Param() params:{id:string} ,@Body() data:any){
    return this.appService.updateUser(params.id,data)
  }
  @Delete('del/:id')
  async DeleteNote(@Param() params:{id: string} ){
    return this.appService.deleteUser(params.id)
  }
  @HttpCode(HttpStatus.OK)
  @Get('logIn/')
  // @UseGuards(AuthGuard())
  log_In(@Body() data:any){
    return this.appService.logIn(data)
  }
  @Get('checkLogIn/')
  async checkLogIn( @Headers() data:any){
    // console.log('data====>>',data)
    return await this.appService.checkLogIn(data)
  }
}

