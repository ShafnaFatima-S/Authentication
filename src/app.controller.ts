import { Body, Controller, Delete, Get, Header, Headers, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
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
  @Get('logIn')
  log_In(@Query('username')username:string,@Query('password')password:string){
    try{
      console.log('data==========>>',{username,password})
      return this.appService.logIn({username,password})
    }
    catch(e){
      return {status:"ERROR",message:`Request failed with error:  ${e.message}`}
    }
    
  }
  @Get('checkLogIn/')
  async checkLogIn( @Headers() data:any){
    // console.log('data====>>',data)
    return await this.appService.checkLogIn(data)
  }

@Put('forgot/:id')
async forgotPass(@Param() params:{id:string},@Body() data:any){
  return await this.appService.forgotPassword(params.id,data)
}

}

