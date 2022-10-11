const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true

        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        thoughts: {
            type: Array,
            default:[]
        },
        friends: {
            type: Array,
            default:[]
        }

    },
    {
        // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
        // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
)

const User = model('user', userSchema);

module.exports = User;