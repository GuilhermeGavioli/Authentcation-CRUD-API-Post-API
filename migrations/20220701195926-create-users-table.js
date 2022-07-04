'use strict';

const { query } = require("express");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users',
      {
        id: {
          type: Sequelize.STRING(),
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE(),
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE(),
          allowNull: true,

        }
      });
    
    await queryInterface.createTable('posts',
      {
        id: {
          type: Sequelize.STRING(),
          allowNull: false,
          primaryKey: true
        },
        text: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
        owner: {
          type: Sequelize.STRING(),
          allowNull: false,
          references: { model: 'users', key: 'id' }
        },
        createdAt: {
          type: Sequelize.DATE(),
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE(),
          allowNull: true,

        }
      });

    
  
  
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('posts');
     
  }
};
