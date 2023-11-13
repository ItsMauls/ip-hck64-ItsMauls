'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey : 'userId',
        as : 'user'
      })
      Comment.belongsTo(models.Post, {
        foreignKey : 'postId',
        as : 'post'
      })
    }
  }
  Comment.init({
    PostId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};



