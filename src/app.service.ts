import { Injectable, Req } from '@nestjs/common';
import { IAuth } from './auth.interface';
import { generateID } from '@jetit/id';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { AuthApp } from './auth.entities';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { format, addDays, differenceInDays, parseISO } from 'date-fns';
import { error } from 'console';


@Injectable()

export class AppService {
  
  constructor(
    @InjectRepository(AuthApp)
     private authEntity: Repository<AuthApp>,
    private jwtService: JwtService,
    private configService:ConfigService,
  ){}
  
  // getHello(): string {
  //   return 'Hello World!';
  // }
 async createUser(data:{username:string,password:string}){
    try{
      switch(true){
        case typeof data.username !== "string":
          throw new Error("The username should be a string")
        case typeof data.password !== "string":
          throw new Error("The password should be a string")
        
      }
      const id:  string =`E_${generateID('HEX')}`
      const username=data.username
      const pass=data.password
      const saltRounds=10;
      const password= await bcrypt.hash(pass,saltRounds)
      console.log(password)
      const details={id,username,password}
      this.authEntity.save(details)
      console.log(details)
      return {status:"Success",message:"Username and password created successfully",data:details}
    }
    catch(e){
      return `Request failed with error:  ${e.message}`
    }
    
  }
  async checkUser(data:any){
    try{
      const details=await this.authEntity.findOne({where:{username:data.username}})
      console.log(details)

        const oldPass:any=details?.password
        const password=data.password
         const match =await bcrypt.compare(password, oldPass)
         console.log(match)
      
      
      if(match === true){
        return {status:"SUCCESS",message:"The passwords match"}
      }
      else{
        throw new Error("Invalid Password...")
      }
      
    }
    catch(e){
      return `Request failed with error:  ${e.message}`
    }
  }

  async allUser(){
    try{
      const allData= await this.authEntity.find({where:{delete:false}})
      return {status:'SUCCESS',message:'All the user details are listed successfully',data:allData}
    }
    catch(e){
      return `request failed with error:  ${e.message}`
    }
  }

  async updateUser(id:string,data:any){
    try{
      switch(true){
        case typeof data.username !== "string":
          throw new Error("The username should be a string")
        case typeof data.password !== "string":
          throw new Error("The password should be a string")
      }
      const check=await this.authEntity.findOne({where:{id}})
      if(!check)throw new Error("User not found")
      console.log(check)
      const username=data.username
      const pass=data.password
      const saltRounds=10;
      const password= await bcrypt.hash(pass,saltRounds)
      const details={id,...data,password}
      const update= await this.authEntity.update({id},details)
      // console.log(update)
      return {status:'SUCCESS',message:'Updated Successfully',details}
    }
    catch(e){
      return `request failed with error:  ${e.message}`
    }
  }

  async deleteUser(id:string){
    try{
      await this.authEntity.findOne({where:{id}})
      // await this.authEntity.delete(id)
      const upd=await this.authEntity.update({id},{delete:true,deletedAt:new Date()})
      return {status:"SUCCESS",message:"Deleted successfully"}
    }
    catch(e){
    return `Request failed with error:  ${e.message}`
    }
}
async logIn(data:{username:string,password:string}){
  try{
    const details=await this.authEntity.findOne({where:{username:data.username}})
    console.log(details)
    if(!details) throw new Error("Incorrect username and password!")
      const oldPass:any=details?.password
      const password=data.password
      const match =await bcrypt.compare(password, oldPass)
      
      //  console.log(match)
    if(match === true){
      const payload={id:details?.id,password:password,username:details?.username}
      const token= await this.jwtService.signAsync(payload,{secret:'secret'})
       console.log("Jwt token---------->",token)
      return {status:"SUCCESS",message:"JWT Token Generated",token:token}
      // return {status:"SUCCESS",message:"The passwords match"}
    }
    else{
      throw new Error("Invalid Password...")
    }
    
  }
  catch(e){
    // return `Request failed with error:  ${e.message}`
    return {status:"ERROR",message:`Request failed with error:  ${e.message}`}
  }
}

async checkLogIn(data:any){
  try{
    const token=data
    console.log("data---->",data)
    const new_token:string=token.authorization
    //  console.log("token------>",new_token)
    const new_token1:string=new_token.replace('Bearer','').trim()
    //  console.log(new_token1)
    const decode=this.jwtService.verify(new_token1,{secret:'secret'})
    console.log(decode)
     const issued=new Date(decode.iat*1000)
     console.log("Issued Date:",format(issued,'dd-MM-yyyy hh-mm-ss'))
     const expires=new Date(decode.exp*1000)
     console.log("Expired Date: ",format(expires,'dd-MM-yyyy hh-mm-ss'))
    const current=new Date()
    console.log("Current Date: ",format(current,'dd-MM-yyyy hh-mm-ss'))
     if(expires < current){
      throw new Error("Time expired")
     }
    //  const difference = expiresAt.getTime() - issuedAt.getTime();
    //  const new_diff=new Date(difference*1000)
    
    return {status:'SUCCESS',message:"The tokens are valid",data:{userId:decode.id}}

  }
  catch(e){
    return `Request failed with error:  ${e.message}`
  }
}

async forgotPassword(data:{username:string,password:string}){
  try{
    const check=await this.authEntity.findOne({where:{username:data.username}})
      if(!check)throw new Error("User not found")
    const username=data.username
    const newPass=data.password
    console.log("newPass-->",newPass)
    const saltRounds=10;
    const password= await bcrypt.hash(newPass,saltRounds)
    const update= await this.authEntity.update({username:username},{password:password})
    return {status:'SUCCESS',message:'Password updated successfully'}
  }
  catch(e){
     return `Request failed with error:  ${e.message}`
  }
}
}


