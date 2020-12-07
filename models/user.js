'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Message, Token, Friend, Image }) {
      // define association here
      this.hasMany(Message, { foreignKey: 'userId', as: 'messages' })

      this.hasMany(Token, { foreignKey: 'userId', as: 'tokens' })
      
      this.hasMany(Friend, { foreignKey: 'userId', as: 'friends' })
      
      this.hasMany(Image, { foreignKey: 'userId', as: 'image' })
    }

    toJSON(){
      return { ...this.get(), id: undefined}
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name !' },
        notEmpty: { msg: 'User must not empty !' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name !' },
        notEmpty: { msg: 'User must not empty !' },
        isEmail: { msg: 'Must b valid email adddress !' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name !' },
        notEmpty: { msg: 'User must not empty !' }
      }
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a role !' },
        notEmpty: { msg: 'User must not empty !' }
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};