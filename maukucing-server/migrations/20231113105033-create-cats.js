'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull : false,
        validate : {
        notEmpty : {
          args : true,
          msg : 'Name is required!'
        },
        notNull : {
          args : true,
          msg : 'Name is required!'
        }
      }
      },
      breed: {
        type: Sequelize.STRING,
        allowNull : false,
        validate : {
        notEmpty : {
          args : true,
          msg : 'Breed is required!'
        },
        notNull : {
          args : true,
          msg : 'Breed is required!'
        }
      }
      },
      gender: {
        type: Sequelize.STRING,
        allowNull : false,
        validate : {
        notEmpty : {
          args : true,
          msg : 'Gender is required!'
        },
        notNull : {
          args : true,
          msg : 'Gender is required!'
        }
      }
      },
      UserId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
    await queryInterface.dropTable('Cats');
  }
};