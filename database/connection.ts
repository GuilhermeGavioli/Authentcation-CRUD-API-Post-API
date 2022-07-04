import { Sequelize } from "sequelize";
export const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '123456Seven##',
    database: 'postapp'
})