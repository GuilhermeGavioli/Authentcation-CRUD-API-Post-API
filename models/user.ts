import { Sequelize, DataTypes } from "sequelize";

import { connection } from "../database/connection";
// const sequelize = new Sequelize();
import { Post } from "./post";

export const User = connection.define('user', {

    id: {
        type: DataTypes.STRING(),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    
}, {
    timestamps: false
})

User.hasMany(Post)

