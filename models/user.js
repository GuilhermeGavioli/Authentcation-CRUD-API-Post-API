"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
// const sequelize = new Sequelize();
const post_1 = require("./post");
exports.User = connection_1.connection.define('user', {
    id: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false,
    },
}, {
    timestamps: false
});
exports.User.hasMany(post_1.Post);
