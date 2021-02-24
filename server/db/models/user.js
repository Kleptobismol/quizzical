const { STRING, BOOLEAN, ARRAY, INTEGER } = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  email: {
    type: STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: STRING,
    allowNull: false
  },
  firstName: {
    type: STRING,
    allowNull: false,
    allowEmpty: false
  },
  lastName: {
    type: STRING,
    allowNull: false,
    allowEmpty: false
  }
})

module.exports = User

// Instance methods
User.prototype.correctPassword = function(candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

// Class methods
User.authenticate = async function({ email, password }){
    const user = await this.findOne({where: {email}})
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
};

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

// Hooks
const hashPassword = async(user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

// Covers password hashing
User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => {
  users.forEach(hashPassword)
})
