import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
// import { jwtConstants } from 'src/constants';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // return true;
    const request= context.switchToHttp().getRequest();
    const token=this.extractTokenFromHeader(request);
    if(!token){
      throw new UnauthorizedException();
    }
    try{
      const payload= this.jwtService.verifyAsync(token,{
        secret: process.env.secret
      });
      request['details']=payload;
    }
    catch{
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractTokenFromHeader(request:Request):string | undefined{
    const [type,token]=request.headers.authorization?.split(' ')??[];
    return type=='Bearer'? token:undefined;
  }
}
