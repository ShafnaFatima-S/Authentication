import { Injectable } from '@nestjs/common';
import { IAuth } from './auth.interface';
import { generateID } from '@jetit/id';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { AuthApp } from './auth.entities';
import * as bcrypt from 'bcrypt';


@Injectable()

export class AppService {
  
  constructor(
    @InjectRepository(AuthApp)
    private authEntity: Repository<AuthApp>,
  ){}
  // getHello(): string {
  //   return 'Hello World!';
  // }
 async createUser(inData:IAuth){
    try{
      switch(true){
        case typeof inData.username !== "string":
          throw new Error("The username should be a string")
        case typeof inData.password !== "string":
          throw new Error("The password should be a string")
        
      }
      const id:  string =`E_${generateID('HEX')}`
      const username=inData.username
      const pass=inData.password
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
  async checkUser(id:string,data:IAuth){
    try{
      const find=await this.authEntity.findOne({where:{id}})
      // const oldPass=find?.password
      console.log(find)
      const pass=data
      //  const saltRounds=10;
      //  const password= await bcrypt.hash(data,saltRounds)
    //  const oldPass= await this.authEntity()
       const match = bcrypt.compare(pass,find)
      // const p= await this.authEntity.find({where:{password:data.password}})
      // console.log(match)
       console.log(match)
    }
    catch(e){
      return `Request failed with error:  ${e.message}`
    }
      // const oldPass= await this.authEntity.findOne({where:{password}});
      // console.log(oldPass)
      // const match=bcrypt.compare(password)
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

 
}


