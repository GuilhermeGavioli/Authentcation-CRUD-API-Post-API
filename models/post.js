"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
// const sequelize = new Sequelize();
exports.Post = connection_1.connection.define('post', {
    id: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false,
    },
    owner: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE(),
        allowNull: true,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE(),
        allowNull: true,
    }
}, {
    timestamps: true
});
