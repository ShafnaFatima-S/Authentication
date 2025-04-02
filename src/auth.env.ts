import { DataSource, DataSourceOptions } from "typeorm";
import { AuthApp } from "./auth.entities";
require('dotenv').config()

export const dataSource:DataSourceOptions ={
    type: 'postgres',
    host: process.env.HOST,
    port: parseInt(process.env.PORT??'3000'),
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [AuthApp],
    synchronize: true ,

    
  }