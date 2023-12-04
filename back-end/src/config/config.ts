// config.ts
import { SequelizeOptions } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const config: SequelizeOptions = {
    database: process.env.DB_NAME as string,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    dialect: 'mysql', 
    logging: false, 
   
};

export default config;
