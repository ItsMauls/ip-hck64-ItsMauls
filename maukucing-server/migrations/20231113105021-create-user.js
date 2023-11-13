'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull : false,
        validate : {
          notEmpty : {
            args : true,
            msg : 'Username is required!'
          },
          notNull : {
            args : true,
            msg : 'Username is required!'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull : false,
        validate : {
        notEmpty : {
          args : true,
          msg : 'Email is required!'
        },
        notNull : {
          args : true,
          msg : 'Email is required!'
        }
      }
        
      },
      password: {
        type: Sequelize.STRING,
        allowNull : false,
        validate : {
        notEmpty : {
          args : true,
          msg : 'Password is required!'
        },
        notNull : {
          args : true,
          msg : 'Password is required!'
        }
      }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};