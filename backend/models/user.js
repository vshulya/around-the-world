const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isUrl = require('validator/lib/isURL');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'User',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link) => isUrl(link),
      message: 'Validation failed, insert a url',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Validation failed, incorrect email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Wrong email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Wrong email or password'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('User', userSchema);
