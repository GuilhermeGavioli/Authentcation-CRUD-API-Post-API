import { Sequelize } from "sequelize";

import dotenv from'dotenv'
dotenv.config();

export const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'bionic',
    password: '123456Seven##',
    database: 'postapp'
})
